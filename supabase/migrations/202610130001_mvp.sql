-- Saff MVP: first-run flag, account deletion, and device hand-over for push.
-- Run once after 202609290001_saff.sql.
alter table public.profiles alter column settings set default '{"name":"Friend","city":"Lahore, PK","latitude":31.5204,"longitude":74.3587,"timezone":"Asia/Karachi","method":"Karachi","hanafi":true,"reminders":false,"nudges":false,"offset":0,"reminderPrayers":["fajr","dhuhr","asr","maghrib","isha"],"onboarded":false}'::jsonb;
create or replace function public.save_settings(p_settings jsonb) returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 if char_length(trim(p_settings->>'name')) not between 1 and 50 or p_settings->>'name' is null then raise exception 'Enter a name between 1 and 50 characters';end if;
 if not exists(select 1 from pg_timezone_names where name=p_settings->>'timezone') then raise exception 'Choose a valid timezone';end if;
 if (p_settings->>'latitude')::float not between -90 and 90 or (p_settings->>'longitude')::float not between -180 and 180 or p_settings->>'latitude' is null or p_settings->>'longitude' is null then raise exception 'Invalid coordinates';end if;
 if p_settings->>'method' not in ('Karachi','MuslimWorldLeague','Egyptian','UmmAlQura','Dubai','MoonsightingCommittee','NorthAmerica','Singapore','Tehran','Turkey') or p_settings->>'method' is null then raise exception 'Invalid calculation method';end if;
 if (p_settings->>'offset')::int not in (0,5,15,30) or p_settings->>'offset' is null then raise exception 'Invalid reminder offset';end if;
 if jsonb_typeof(p_settings->'reminderPrayers') <> 'array' or p_settings->'reminderPrayers' is null or exists(select 1 from jsonb_array_elements_text(p_settings->'reminderPrayers') p where p not in ('fajr','dhuhr','asr','maghrib','isha')) then raise exception 'Invalid prayer selection';end if;
 if jsonb_typeof(p_settings->'reminders') is distinct from 'boolean' or jsonb_typeof(p_settings->'nudges') is distinct from 'boolean' or jsonb_typeof(p_settings->'hanafi') is distinct from 'boolean' or (p_settings ? 'onboarded' and jsonb_typeof(p_settings->'onboarded') is distinct from 'boolean') then raise exception 'Invalid preferences';end if;
 update public.profiles set settings=p_settings where id=auth.uid();
 delete from public.prayer_schedule where user_id=auth.uid();
 delete from public.notification_jobs where user_id=auth.uid() and kind='scheduled' and status='pending';
end;$$;
-- Leaving each circle first hands ownership on (or deletes empty circles); the auth row cascades to everything else.
create function public.delete_account() returns void language plpgsql security definer set search_path='' as $$ declare c uuid;begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 for c in select circle_id from public.circle_members where user_id=auth.uid() loop perform public.leave_circle(c);end loop;
 delete from auth.users where id=auth.uid();
end;$$;
-- A browser endpoint belongs to one device; whoever is signed in there now receives its reminders.
create function public.register_push_subscription(p_endpoint text,p_subscription jsonb) returns void language plpgsql security definer set search_path='' as $$ begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 if p_endpoint is null or p_endpoint !~ '^https://' or p_subscription->>'endpoint' is distinct from p_endpoint then raise exception 'Invalid push subscription';end if;
 insert into public.push_subscriptions(user_id,endpoint,subscription) values(auth.uid(),p_endpoint,p_subscription)
 on conflict(endpoint) do update set user_id=excluded.user_id,subscription=excluded.subscription,created_at=now();
end;$$;
revoke execute on function public.delete_account(),public.register_push_subscription(text,jsonb) from public,anon,authenticated;
grant execute on function public.delete_account(),public.register_push_subscription(text,jsonb) to authenticated;
