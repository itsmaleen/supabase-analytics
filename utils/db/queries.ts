import sql from "./db";

export async function getActiveUsersByDay() {
  const results = await sql`
    SELECT * FROM get_active_users_by_day();
  `;
  // results = Result [{ date: "2022-01-01", active_users: 100 }, { date: "2022-01-02", active_users: 200 }, ...]
  return results;
}

export async function getActiveUsersByWeek() {
  const results = await sql`
        SELECT * FROM get_active_users_by_week();
    `;
  // results = Result [{ week: "1", active_users: 100 }, { week: "2", active_users: 200 }, ...]
  return results;
}

export async function getActiveUsersByMonth() {
  const results = await sql`
        SELECT * FROM get_active_users_by_month();
    `;
  // results = Result [{ month: "1", active_users: 100 }, { month: "2", active_users: 200 }, ...]
  return results;
}
