'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { metricComparisonData } from '@/lib/constants';

const chartConfig = {
  realOnly: {
    label: 'Real Data Only',
    color: 'hsl(var(--chart-1))',
  },
  mixed: {
    label: 'Real + Synthetic Data',
    color: 'hsl(var(--chart-2))',
  },
};

export function MetricComparisonChart() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Classifier Performance Comparison</CardTitle>
        <CardDescription>Real Data Only vs. Real + Synthetic Data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={metricComparisonData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              layout="vertical" // Use vertical layout for better label reading
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 1]} tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                 dataKey="metric"
                 type="category"
                 tickLine={false}
                 axisLine={false}
                 tickMargin={8}
                 width={80} // Adjust width for labels
              />
              <Tooltip
                 cursor={false}
                 content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="realOnly" fill="var(--color-realOnly)" radius={4} name="Real Only" barSize={20} />
              <Bar dataKey="mixed" fill="var(--color-mixed)" radius={4} name="Real + Synthetic" barSize={20}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
