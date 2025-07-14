'use client'
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { DemandForecastData } from '@/lib/data'

const chartConfig = {
  demand: {
    label: 'Demand',
    color: 'hsl(var(--chart-1))',
  },
}

interface DemandForecastChartProps {
  data: DemandForecastData[]
}

export function DemandForecastChart({ data }: DemandForecastChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demand Forecast</CardTitle>
        <CardDescription>Next 30 days by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <RechartsBarChart data={data} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" dataKey="demand" hide />
              <YAxis
                type="category"
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={80}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="demand" fill="var(--color-demand)" radius={4} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
