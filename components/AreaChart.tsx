"use client";
import { AreaChart, Card, EventProps, Title } from "@tremor/react";
import { useState } from "react";

export default function AreaChartWithClick({
  chartData,
}: {
  chartData: {
    date: string;
    new: number;
    returning: number;
  }[];
}) {
  const [value, setValue] = useState<EventProps>(null);
  return (
    <>
      <Card>
        <Title>Daily active users</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
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
