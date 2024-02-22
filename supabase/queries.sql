create
or replace function get_active_users_by_day() returns table (day date, active_users bigint, new_users bigint, returning_users bigint) as $$
begin
  return query
  select
    DATE (a.created_at) as day,
  count(distinct a.payload ->> 'actor_id') as active_users,
     count(distinct a.payload ->> 'actor_id') filter (where a.payload ->> 'action' = 'user_signedup') as new_users,
        count(distinct a.payload ->> 'actor_id') filter (where a.payload ->> 'action' = 'login') as returning_users
from
  auth.audit_log_entries a
where
  a.payload ->> 'action' in ('user_signedup', 'login')
  group by
    day
  order by
    day desc;
end;
$$ language plpgsql;

create
or replace function get_active_users_by_week () returns table (week bigint, active_users bigint) as $$
  select
  EXTRACT (WEEK FROM a.created_at) as week,
  count(distinct a.payload ->> 'actor_id') as active_users
from
  auth.audit_log_entries a
where
  a.payload ->> 'action' in ('user_signedup', 'login')
group by
  week
order by
  week desc;
$$ language sql;

create
or replace function get_active_users_by_month () returns table (month numeric, active_users bigint) as $$
begin
  return query
  select
    EXTRACT (MONTH FROM a.created_at) as month,
    count(distinct a.payload ->> 'actor_id') as active_users
  from
    auth.audit_log_entries a
  where
  a.payload ->> 'action' in ('user_signedup', 'login')
  group by
    month
  order by
    month desc;
end;
$$ language plpgsql;