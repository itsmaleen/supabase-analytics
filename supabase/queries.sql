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

  select
    EXTRACT (MONTH FROM a.created_at) as month,
    count(distinct a.payload ->> 'actor_id') as active_users,
     count(distinct a.payload ->> 'actor_id') filter (where a.payload ->> 'action' = 'user_signedup') as new_users,
  from
    auth.audit_log_entries a
  where
  a.payload ->> 'action' in ('user_signedup', 'login')
  group by
    month
  order by
    month desc;

      select
  EXTRACT (WEEK FROM a.created_at) as week,
  count(distinct a.payload ->> 'actor_id') as active_users,
     count(distinct a.payload ->> 'actor_id') filter (where a.payload ->> 'action' = 'user_signedup') as new_users,
from
  auth.audit_log_entries a
where
  a.payload ->> 'action' in ('user_signedup', 'login')
group by
  week
order by
  week desc;