'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { classifierRealAccuracyData } from '@/lib/constants'; // Assuming data is here

interface AccuracyChartProps {
  title: string;
}

const chartConfig = {
  accuracy: {
    label: 'Accuracy',
    color: 'hsl(var(--chart-3))',
  },
  validationAccuracy: {
    label: 'Validation Accuracy',
    color: 'hsl(var(--chart-3))',
  },
};

export function AccuracyChart({ title }: AccuracyChartProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Epoch vs. Validation Accuracy</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={classifierRealAccuracyData}
               margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="epoch"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `E${value}`}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={30}
                domain={[0.5, 1]} // Assuming accuracy is between 0.5 and 1
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                dataKey="validationAccuracy"
                type="monotone"
                stroke={`var(--color-validationAccuracy)`}
                strokeWidth={2}
                dot={false}
                name="Validation Accuracy"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
       {/* Optional Footer */}
       {/* <CardFooter className="flex border-t p-4">
         <div className="flex items-center gap-2 text-sm text-muted-foreground">
           <TrendingUp className="h-4 w-4" /> Accuracy generally improved over time.
         </div>
       </CardFooter> */}
    </Card>
  );
}
