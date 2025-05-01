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
import { initialWganLossData, classifierRealLossData } from '@/lib/constants'; // Assuming data is here

interface LossChartProps {
  title: string;
}

export function LossChart({ title }: LossChartProps) {
  const isWgan = title.toLowerCase().includes('wgan');
  const chartData = isWgan ? initialWganLossData : classifierRealLossData;

  const chartConfig = {
    loss: { label: 'Loss', color: 'hsl(var(--chart-1))' },
    generatorLoss: { label: 'Generator Loss', color: 'hsl(var(--chart-1))' },
    discriminatorLoss: { label: 'Discriminator Loss', color: 'hsl(var(--chart-2))' },
    trainingLoss: { label: 'Training Loss', color: 'hsl(var(--chart-1))' },
    validationLoss: { label: 'Validation Loss', color: 'hsl(var(--chart-2))' },
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Epoch vs. Loss</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
             <LineChart
                data={chartData}
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
               <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} />
               <Tooltip
                 cursor={false}
                 content={<ChartTooltipContent indicator="line" />}
               />
                <Legend verticalAlign="top" height={36} />
                {isWgan ? (
                  <>
                   <Line
                      dataKey="generatorLoss"
                      type="monotone"
                      stroke={`var(--color-generatorLoss)`}
                      strokeWidth={2}
                      dot={false}
                      name="Generator"
                    />
                    <Line
                      dataKey="discriminatorLoss"
                      type="monotone"
                      stroke={`var(--color-discriminatorLoss)`}
                      strokeWidth={2}
                      dot={false}
                      name="Discriminator"
                    />
                  </>
                 ) : (
                  <>
                   <Line
                      dataKey="trainingLoss"
                      type="monotone"
                      stroke={`var(--color-trainingLoss)`}
                      strokeWidth={2}
                      dot={false}
                      name="Training"
                    />
                    <Line
                      dataKey="validationLoss"
                      type="monotone"
                      stroke={`var(--color-validationLoss)`}
                       strokeWidth={2}
                      dot={false}
                      name="Validation"
                    />
                 </>
                )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
       {/* Optional Footer */}
       {/* <CardFooter className="flex border-t p-4">
         <div className="flex items-center gap-2 text-sm text-muted-foreground">
           <TrendingUp className="h-4 w-4" /> Loss generally decreased over time.
         </div>
       </CardFooter> */}
    </Card>
  );
}
