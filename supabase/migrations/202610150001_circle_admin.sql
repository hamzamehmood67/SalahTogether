-- Saff: the circle owner (shown as admin) decides whether members may share the invite code.
-- Run once after 202610130001_mvp.sql.
alter table public.circles add column members_can_invite boolean not null default false;
-- Members see the code only while the owner allows member invites.
create or replace function public.get_dashboard() returns jsonb language plpgsql stable security definer set search_path='' as $$ declare result jsonb;begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 select jsonb_build_object('settings',p.settings,'records',coalesce((select jsonb_agg(jsonb_build_object('date',r.date,'prayer',r.prayer)) from public.prayer_records r where r.user_id=p.id),'[]'::jsonb),'circles',coalesce((select jsonb_agg(jsonb_build_object('id',c.id,'name',c.name,'owner',c.owner,'goal',c.goal,'membersCanInvite',c.members_can_invite,'code',case when c.owner=p.id or c.members_can_invite then (select code from public.circle_invites where circle_id=c.id) else null end,'members',(select jsonb_agg(jsonb_build_object('id',mp.id,'name',mp.settings->>'name','localDate',(now() at time zone (mp.settings->>'timezone'))::date,'nudges',(mp.settings->>'nudges')::boolean,'records',coalesce((select jsonb_agg(jsonb_build_object('date',r.date,'prayer',r.prayer)) from public.prayer_records r where r.user_id=mp.id),'[]'::jsonb))) from public.circle_members cm join public.profiles mp on mp.id=cm.user_id where cm.circle_id=c.id))) from public.circles c join public.circle_members mine on mine.circle_id=c.id where mine.user_id=p.id),'[]'::jsonb)) into result from public.profiles p where p.id=auth.uid();return result;
end;$$;
-- Owner only. Turning member invites off rotates the code, so links members already passed on stop working.
create function public.set_circle_invites(p_circle uuid,p_allowed boolean) returns void language plpgsql security definer set search_path='' as $$ declare was boolean;begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 if p_allowed is null then raise exception 'Choose whether members can invite';end if;
 select members_can_invite into was from public.circles where id=p_circle and owner=auth.uid() for update;
 if not found then raise exception 'Only the circle admin can change who invites';end if;
 update public.circles set members_can_invite=p_allowed where id=p_circle;
 if was and not p_allowed then update public.circle_invites set code=upper(substr(replace(gen_random_uuid()::text,'-',''),1,8)) where circle_id=p_circle;end if;
end;$$;
-- Owner only: issue a new code when an old link has gone further than intended.
create function public.reset_circle_code(p_circle uuid) returns text language plpgsql security definer set search_path='' as $$ declare result text;begin
 if auth.uid() is null then raise exception 'Sign in first';end if;
 if not exists(select 1 from public.circles where id=p_circle and owner=auth.uid()) then raise exception 'Only the circle admin can reset the invite code';end if;
 update public.circle_invites set code=upper(substr(replace(gen_random_uuid()::text,'-',''),1,8)) where circle_id=p_circle returning code into result;
 return result;
end;$$;
revoke execute on function public.set_circle_invites(uuid,boolean),public.reset_circle_code(uuid) from public,anon,authenticated;
grant execute on function public.set_circle_invites(uuid,boolean),public.reset_circle_code(uuid) to authenticated;
