'use client'

import { StockTrendChart } from './stock-trend-chart'
import { DemandForecastChart } from './demand-forecast-chart'
import { initialStockTrend, initialDemandForecast } from '@/lib/data'

export default function AnalyticsPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <StockTrendChart data={initialStockTrend} />
      </div>
      <div className="lg:col-span-2">
        <DemandForecastChart data={initialDemandForecast} />
      </div>
    </div>
  )
}
