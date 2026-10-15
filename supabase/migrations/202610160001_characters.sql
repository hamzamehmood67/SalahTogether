-- Saff: each person's character (boy with cap or girl with hijab) comes from the optional settings.gender.
-- Run once after 202610150001_circle_admin.sql.
-- gender is optional; when present it must be 'male' or 'female'.
create or replace function public.save_settings(p_settings jsonb) returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 if char_length(trim(p_settings->>'name')) not between 1 and 50 or p_settings->>'name' is null then raise exception 'Enter a name between 1 and 50 characters';end if;
 if not exists(select 1 from pg_timezone_names where name=p_settings->>'timezone') then raise exception 'Choose a valid timezone';end if;
 if (p_settings->>'latitude')::float not between -90 and 90 or (p_settings->>'longitude')::float not between -180 and 180 or p_settings->>'latitude' is null or p_settings->>'longitude' is null then raise exception 'Invalid coordinates';end if;
 if p_settings->>'method' not in ('Karachi','MuslimWorldLeague','Egyptian','UmmAlQura','Dubai','MoonsightingCommittee','NorthAmerica','Singapore','Tehran','Turkey') or p_settings->>'method' is null then raise exception 'Invalid calculation method';end if;
 if (p_settings->>'offset')::int not in (0,5,15,30) or p_settings->>'offset' is null then raise exception 'Invalid reminder offset';end if;
 if jsonb_typeof(p_settings->'reminderPrayers') <> 'array' or p_settings->'reminderPrayers' is null or exists(select 1 from jsonb_array_elements_text(p_settings->'reminderPrayers') p where p not in ('fajr','dhuhr','asr','maghrib','isha')) then raise exception 'Invalid prayer selection';end if;
 if p_settings ? 'gender' and coalesce(p_settings->>'gender','') not in ('male','female') then raise exception 'Choose male or female';end if;
 if jsonb_typeof(p_settings->'reminders') is distinct from 'boolean' or jsonb_typeof(p_settings->'nudges') is distinct from 'boolean' or jsonb_typeof(p_settings->'hanafi') is distinct from 'boolean' or (p_settings ? 'onboarded' and jsonb_typeof(p_settings->'onboarded') is distinct from 'boolean') then raise exception 'Invalid preferences';end if;
 update public.profiles set settings=p_settings where id=auth.uid();
 delete from public.prayer_schedule where user_id=auth.uid();
 delete from public.notification_jobs where user_id=auth.uid() and kind='scheduled' and status='pending';
end;$$;
-- Circle members see each other's character.
create or replace function public.get_dashboard() returns jsonb language plpgsql stable security definer set search_path='' as $$ declare result jsonb;begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 select jsonb_build_object('settings',p.settings,'records',coalesce((select jsonb_agg(jsonb_build_object('date',r.date,'prayer',r.prayer)) from public.prayer_records r where r.user_id=p.id),'[]'::jsonb),'circles',coalesce((select jsonb_agg(jsonb_build_object('id',c.id,'name',c.name,'owner',c.owner,'goal',c.goal,'membersCanInvite',c.members_can_invite,'code',case when c.owner=p.id or c.members_can_invite then (select code from public.circle_invites where circle_id=c.id) else null end,'members',(select jsonb_agg(jsonb_build_object('id',mp.id,'name',mp.settings->>'name','localDate',(now() at time zone (mp.settings->>'timezone'))::date,'nudges',(mp.settings->>'nudges')::boolean,'gender',mp.settings->>'gender','records',coalesce((select jsonb_agg(jsonb_build_object('date',r.date,'prayer',r.prayer)) from public.prayer_records r where r.user_id=mp.id),'[]'::jsonb))) from public.circle_members cm join public.profiles mp on mp.id=cm.user_id where cm.circle_id=c.id))) from public.circles c join public.circle_members mine on mine.circle_id=c.id where mine.user_id=p.id),'[]'::jsonb)) into result from public.profiles p where p.id=auth.uid();return result;
end;$$;
