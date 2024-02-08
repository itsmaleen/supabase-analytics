import AreaChartUsageExampleWithClickEvent from "@/components/AreaChart";
import {
  getActiveUsersByDay,
  getActiveUsersByMonth,
  getActiveUsersByWeek,
} from "@/utils/db/queries";
import { AreaChart, Card, Grid, Metric, Text, Title } from "@tremor/react";
import { Row } from "postgres";

export default async function Index() {
  const dailyResults = await getActiveUsersByDay();
  const weeklyResults = await getActiveUsersByWeek();
  const monthlyResults = await getActiveUsersByMonth();

  if (!dailyResults) {
    return <div>Loading...</div>;
  }

  type DailyResult = {
    date: string;
    active_users: number;
  };

  type WeeklyResult = {
    week: number;
    active_users: number;
  };

  type MonthlyResult = {
    month: number;
    active_users: number;
  };

  const todayResult = dailyResults.find((result) => {
    const date = new Date(result.day);
    const today = new Date();
    console.log(date, today);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  const thisWeekResult = weeklyResults.find((result) => {
    const today = new Date();
    const onejan = new Date(today.getFullYear(), 0, 1);
    const week = Math.ceil(
      ((today.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) /
        7
    );
    console.log(week);
    return result.week == week;
  });

  const thisMonthResult = monthlyResults.find((result) => {
    const today = new Date();
    return result.month == today.getMonth() + 1;
  });

  const date = new Date();
  const hour = date.getHours();
  let timeOfDay = "morning";
  if (hour >= 12 && hour < 17) {
    timeOfDay = "afternoon";
  } else if (hour >= 17) {
    timeOfDay = "evening";
  }
  return (
    <div className="mx-auto max-w-4xl py-12 space-y-10">
      <header className="">
        <h1 className="mt-4 text-4xl font-bold ">Good {timeOfDay}!</h1>
        <p className="mt-2 text-gray-500">
          Here's a quick look at what's user data of your supabase project (Time
          is in UTC.)
        </p>
      </header>

      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <Card className="space-y-2">
          <Title>Active today</Title>
          <Metric>{todayResult?.active_users || 0}</Metric>
          {/* <Text>0% vs yesterday</Text> */}
        </Card>
        <Card className="space-y-2">
          <Title>Active this week</Title>
          <Metric>{thisWeekResult?.active_users || 0}</Metric>
          {/* <Text>0% vs last week</Text> */}
        </Card>
        <Card className="space-y-2">
          <Title>Active this month</Title>
          <Metric>{thisMonthResult?.active_users || 0}</Metric>
          {/* <Text>0% vs last month</Text> */}
        </Card>
      </Grid>
      <AreaChartUsageExampleWithClickEvent />
    </div>
  );
}
