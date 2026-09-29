-- Saff: private by default; circle membership grants prayer-history visibility.
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 settings jsonb not null default '{"name":"Friend","city":"Lahore, PK","latitude":31.5204,"longitude":74.3587,"timezone":"Asia/Karachi","method":"Karachi","hanafi":true,"reminders":false,"nudges":false,"offset":0,"reminderPrayers":["fajr","dhuhr","asr","maghrib","isha"]}'::jsonb,
 created_at timestamptz not null default now()
);
create table public.prayer_records(user_id uuid not null references public.profiles(id) on delete cascade, date date not null, prayer text not null check(prayer in ('fajr','dhuhr','asr','maghrib','isha')), timezone text not null, updated_at timestamptz not null default now(), primary key(user_id,date,prayer));
create table public.circles(id uuid primary key default gen_random_uuid(),name text not null check(char_length(name) between 2 and 60),owner uuid not null references public.profiles(id),goal integer not null default 750 check(goal between 1 and 100000),created_at timestamptz not null default now());
create table public.circle_members(circle_id uuid references public.circles(id) on delete cascade,user_id uuid references public.profiles(id) on delete cascade,joined_at timestamptz not null default now(),primary key(circle_id,user_id));
create table public.circle_invites(circle_id uuid primary key references public.circles(id) on delete cascade,code text unique not null default upper(substr(replace(gen_random_uuid()::text,'-',''),1,8)));
create table public.push_subscriptions(id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id) on delete cascade,endpoint text unique not null,subscription jsonb not null,created_at timestamptz not null default now());
create table public.prayer_schedule(user_id uuid references public.profiles(id) on delete cascade,date date not null,prayer text not null,starts_at timestamptz not null,remind_at timestamptz not null,primary key(user_id,date,prayer));
create table public.notification_jobs(id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id) on delete cascade,date date not null,prayer text not null,kind text not null check(kind in ('scheduled','nudge')),sender uuid references public.profiles(id) on delete set null,due_at timestamptz not null,status text not null default 'pending' check(status in ('pending','processing','sent','expired')),attempts integer not null default 0,last_error text,claimed_at timestamptz,unique(user_id,date,prayer,kind));
create index prayer_date_idx on public.prayer_records(date,user_id);
create index member_user_idx on public.circle_members(user_id,circle_id);
create index jobs_due_idx on public.notification_jobs(status,due_at);
create function public.on_signup() returns trigger language plpgsql security definer set search_path='' as $$ begin insert into public.profiles(id) values(new.id);return new;end; $$;
create trigger saff_signup after insert on auth.users for each row execute function public.on_signup();
insert into public.profiles(id) select id from auth.users on conflict do nothing;
create function public.shares_circle(other uuid) returns boolean language sql stable security definer set search_path='' as $$ select auth.uid() is not null and exists(select 1 from public.circle_members mine join public.circle_members theirs on mine.circle_id=theirs.circle_id where mine.user_id=auth.uid() and theirs.user_id=other); $$;
alter table public.profiles enable row level security;
alter table public.prayer_records enable row level security;
alter table public.circles enable row level security;
alter table public.circle_members enable row level security;
alter table public.circle_invites enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.prayer_schedule enable row level security;
alter table public.notification_jobs enable row level security;
revoke all on public.profiles, public.prayer_records, public.circles, public.circle_members, public.circle_invites, public.push_subscriptions, public.prayer_schedule, public.notification_jobs from anon,authenticated;
grant select on public.prayer_records to authenticated;
create policy prayer_visibility on public.prayer_records for select to authenticated using(user_id=auth.uid() or public.shares_circle(user_id));
grant select,insert,update,delete on public.push_subscriptions to authenticated;
create policy subscription_select on public.push_subscriptions for select to authenticated using(user_id=auth.uid());
create policy subscription_insert on public.push_subscriptions for insert to authenticated with check(user_id=auth.uid());
create policy subscription_update on public.push_subscriptions for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
create policy subscription_delete on public.push_subscriptions for delete to authenticated using(user_id=auth.uid());
create function public.save_settings(p_settings jsonb) returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 if char_length(trim(p_settings->>'name')) not between 1 and 50 or p_settings->>'name' is null then raise exception 'Enter a name between 1 and 50 characters';end if;
 if not exists(select 1 from pg_timezone_names where name=p_settings->>'timezone') then raise exception 'Choose a valid timezone';end if;
 if (p_settings->>'latitude')::float not between -90 and 90 or (p_settings->>'longitude')::float not between -180 and 180 or p_settings->>'latitude' is null or p_settings->>'longitude' is null then raise exception 'Invalid coordinates';end if;
 if p_settings->>'method' not in ('Karachi','MuslimWorldLeague','Egyptian','UmmAlQura','Dubai','MoonsightingCommittee','NorthAmerica','Singapore','Tehran','Turkey') or p_settings->>'method' is null then raise exception 'Invalid calculation method';end if;
 if (p_settings->>'offset')::int not in (0,5,15,30) or p_settings->>'offset' is null then raise exception 'Invalid reminder offset';end if;
 if jsonb_typeof(p_settings->'reminderPrayers') <> 'array' or p_settings->'reminderPrayers' is null or exists(select 1 from jsonb_array_elements_text(p_settings->'reminderPrayers') p where p not in ('fajr','dhuhr','asr','maghrib','isha')) then raise exception 'Invalid prayer selection';end if;
 if jsonb_typeof(p_settings->'reminders') is distinct from 'boolean' or jsonb_typeof(p_settings->'nudges') is distinct from 'boolean' or jsonb_typeof(p_settings->'hanafi') is distinct from 'boolean' then raise exception 'Invalid preferences';end if;
 update public.profiles set settings=p_settings where id=auth.uid();
 delete from public.prayer_schedule where user_id=auth.uid();
 delete from public.notification_jobs where user_id=auth.uid() and kind='scheduled' and status='pending';
end;$$;
create function public.set_prayer(p_date date,p_prayer text,p_done boolean) returns void language plpgsql security definer set search_path='' as $$
declare tz text;
begin
 select settings->>'timezone' into tz from public.profiles where id=auth.uid();if tz is null then raise exception 'Sign in first';end if;
 if p_date>(now() at time zone tz)::date then raise exception 'Future days cannot be recorded';end if;
 if p_done then insert into public.prayer_records(user_id,date,prayer,timezone) values(auth.uid(),p_date,p_prayer,tz) on conflict(user_id,date,prayer) do update set updated_at=now();
 else delete from public.prayer_records where user_id=auth.uid() and date=p_date and prayer=p_prayer;end if;
end;$$;
create function public.create_circle(p_name text) returns uuid language plpgsql security definer set search_path='' as $$ declare result uuid;begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 insert into public.circles(name,owner) values(trim(p_name),auth.uid()) returning id into result;
 insert into public.circle_members(circle_id,user_id) values(result,auth.uid());insert into public.circle_invites(circle_id) values(result);return result;end;$$;
create function public.join_circle(p_code text) returns void language plpgsql security definer set search_path='' as $$ declare target uuid;begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 select circle_id into target from public.circle_invites where code=upper(trim(p_code));if target is null then raise exception 'That invite code was not found';end if;
 insert into public.circle_members(circle_id,user_id) values(target,auth.uid()) on conflict do nothing;end;$$;
create function public.leave_circle(p_circle uuid) returns void language plpgsql security definer set search_path='' as $$ declare owner_id uuid;replacement uuid;begin
 select owner into owner_id from public.circles where id=p_circle for update;
 if not exists(select 1 from public.circle_members where circle_id=p_circle and user_id=auth.uid()) then raise exception 'You are not a member';end if;
 delete from public.circle_members where circle_id=p_circle and user_id=auth.uid();
 if owner_id=auth.uid() then select user_id into replacement from public.circle_members where circle_id=p_circle order by joined_at limit 1;
 if replacement is null then delete from public.circles where id=p_circle;else update public.circles set owner=replacement where id=p_circle;update public.circle_invites set code=upper(substr(replace(gen_random_uuid()::text,'-',''),1,8)) where circle_id=p_circle;end if;end if;
end;$$;
create function public.set_circle_goal(p_circle uuid,p_goal integer) returns void language plpgsql security definer set search_path='' as $$ begin
 update public.circles set goal=p_goal where id=p_circle and owner=auth.uid();if not found then raise exception 'Only the owner can edit this goal';end if;end;$$;
create function public.send_nudge(p_recipient uuid,p_prayer text) returns void language plpgsql security definer set search_path='' as $$ declare prefs jsonb;local_day date;start_time timestamptz;begin
 if auth.uid() is null or auth.uid()=p_recipient or not public.shares_circle(p_recipient) then raise exception 'You must share a circle';end if;
 select settings into prefs from public.profiles where id=p_recipient;
 if not coalesce((prefs->>'nudges')::boolean,false) then raise exception 'This member has paused gentle nudges';end if;
 local_day=(now() at time zone (prefs->>'timezone'))::date;
 select starts_at into start_time from public.prayer_schedule where user_id=p_recipient and date=local_day and prayer=p_prayer;
 if start_time is null then raise exception 'Prayer times are being prepared. Please try again shortly';end if;
 if start_time>now() then raise exception 'That prayer is not due for this member yet';end if;
 if exists(select 1 from public.prayer_records where user_id=p_recipient and date=local_day and prayer=p_prayer) then raise exception 'This prayer is already recorded';end if;
 insert into public.notification_jobs(user_id,date,prayer,kind,sender,due_at) values(p_recipient,local_day,p_prayer,'nudge',auth.uid(),now()) on conflict do nothing;
 if not found then raise exception 'A gentle reminder has already been sent for this prayer';end if;
end;$$;
create function public.get_dashboard() returns jsonb language plpgsql stable security definer set search_path='' as $$ declare result jsonb;begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 select jsonb_build_object('settings',p.settings,'records',coalesce((select jsonb_agg(jsonb_build_object('date',r.date,'prayer',r.prayer)) from public.prayer_records r where r.user_id=p.id),'[]'::jsonb),'circles',coalesce((select jsonb_agg(jsonb_build_object('id',c.id,'name',c.name,'owner',c.owner,'goal',c.goal,'code',case when c.owner=p.id then (select code from public.circle_invites where circle_id=c.id) else null end,'members',(select jsonb_agg(jsonb_build_object('id',mp.id,'name',mp.settings->>'name','localDate',(now() at time zone (mp.settings->>'timezone'))::date,'nudges',(mp.settings->>'nudges')::boolean,'records',coalesce((select jsonb_agg(jsonb_build_object('date',r.date,'prayer',r.prayer)) from public.prayer_records r where r.user_id=mp.id),'[]'::jsonb))) from public.circle_members cm join public.profiles mp on mp.id=cm.user_id where cm.circle_id=c.id))) from public.circles c join public.circle_members mine on mine.circle_id=c.id where mine.user_id=p.id),'[]'::jsonb)) into result from public.profiles p where p.id=auth.uid();return result;
end;$$;
-- Only the scheduler can claim work. Leases allow safe recovery after a crash.
create function public.claim_notification_jobs() returns setof public.notification_jobs language sql security definer set search_path='' as $$
 update public.notification_jobs set status='processing',claimed_at=now(),attempts=attempts+1 where id in (select id from public.notification_jobs where due_at<=now() and attempts<3 and (status='pending' or (status='processing' and claimed_at<now()-interval '5 minutes')) order by due_at for update skip locked limit 100) returning *;
$$;
revoke execute on all functions in schema public from public,anon,authenticated;
grant execute on function public.shares_circle(uuid),public.save_settings(jsonb),public.set_prayer(date,text,boolean),public.create_circle(text),public.join_circle(text),public.leave_circle(uuid),public.set_circle_goal(uuid,integer),public.send_nudge(uuid,text),public.get_dashboard() to authenticated;
grant execute on function public.claim_notification_jobs() to service_role;
grant all on public.profiles,public.prayer_records,public.circles,public.circle_members,public.circle_invites,public.push_subscriptions,public.prayer_schedule,public.notification_jobs to service_role;
-- Realtime observes the same SELECT policy as direct reads.
alter publication supabase_realtime add table public.prayer_records;
