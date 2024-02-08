"use client";
import { AreaChart, Card, EventProps, Title } from "@tremor/react";
import { useState } from "react";

const chartdata2 = [
  {
    date: "Jan 23",
    2022: 45,
    2023: 78,
  },
  {
    date: "Feb 23",
    2022: 52,
    2023: 71,
  },
  {
    date: "Mar 23",
    2022: 48,
    2023: 80,
  },
  {
    date: "Apr 23",
    2022: 61,
    2023: 65,
  },
  {
    date: "May 23",
    2022: 55,
    2023: 58,
  },
  {
    date: "Jun 23",
    2022: 67,
    2023: 62,
  },
  {
    date: "Jul 23",
    2022: 60,
    2023: 54,
  },
  {
    date: "Aug 23",
    2022: 72,
    2023: 49,
  },
  {
    date: "Sep 23",
    2022: 65,
    2023: 52,
  },
  {
    date: "Oct 23",
    2022: 68,
    2023: null,
  },
  {
    date: "Nov 23",
    2022: 74,
    2023: null,
  },
  {
    date: "Dec 23",
    2022: 71,
    2023: null,
  },
];

const chartdata = [
  {
    date: "Jan 25",
    new: 45,
    returning: 78,
  },
  {
    date: "Jan 26",
    new: 52,
    returning: 71,
  },
  {
    date: "Jan 27",
    new: 48,
    returning: 80,
  },
  {
    date: "Jan 28",
    new: 61,
    returning: 65,
  },
  {
    date: "Jan 29",
    new: 55,
    returning: 58,
  },
  {
    date: "Jan 30",
    new: 67,
    returning: 62,
  },
  {
    date: "Jan 31",
    new: 60,
    returning: 54,
  },
];

export default function AreaChartUsageExampleWithClickEvent() {
  const [value, setValue] = useState<EventProps>(null);
  return (
    <>
      <Card>
        <Title>Daily active users</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          categories={["returning", "new"]}
          colors={["blue", "indigo"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
          connectNulls={true}
        />
      </Card>
      <p>{JSON.stringify(value, null, 2)}</p>
    </>
  );
}
