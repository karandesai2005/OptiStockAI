'use client'
import { useState } from 'react'

import { OverviewCards } from './overview-cards'
import { StockTrendChart } from './stock-trend-chart'
import { DemandForecastChart } from './demand-forecast-chart'
import { ProductTable } from './product-table'
import { AlertsPanel } from './alerts-panel'
import { PricingPanel } from './pricing-panel'

import {
  initialProducts,
  initialAlerts,
  initialStockTrend,
  initialTotalStock,
  initialTurnoverRate,
  initialDemandForecast,
  getAlerts,
  calculateTotalStock,
  type Product,
} from '@/lib/data'
import { Button } from '../ui/button'
import { RefreshCw } from 'lucide-react'

export default function OverviewPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [alerts, setAlerts] = useState(initialAlerts)
  const [totalStock, setTotalStock] = useState(initialTotalStock)

  const handleUpdateStock = () => {
    const updatedProducts = products.map((p) => ({
      ...p,
      stock: Math.max(0, p.stock + Math.floor(Math.random() * 201) - 100), // Change stock by -100 to +100
    }))
    setProducts(updatedProducts)
    setAlerts(getAlerts(updatedProducts))
    setTotalStock(calculateTotalStock(updatedProducts))
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="xl:col-span-3">
        <OverviewCards
          totalStock={totalStock}
          turnoverRate={initialTurnoverRate}
          alertCount={alerts.length}
        />
      </div>

      <div className="xl:col-span-2">
        <StockTrendChart data={initialStockTrend} />
      </div>

      <div>
        <DemandForecastChart data={initialDemandForecast} />
      </div>

      <div className="xl:col-span-3">
        <ProductTable products={products.slice(0, 5)} />
      </div>

      <div className="xl:col-span-2">
        <PricingPanel products={products} />
      </div>

      <div>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    System Actions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleUpdateStock} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" /> Simulate IoT Stock Update
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                    Click to randomly update stock levels and see how it affects alerts and suggestions.
                </p>
            </CardContent>
        </Card>
        <div className="mt-4 md:mt-8">
            <AlertsPanel alerts={alerts} />
        </div>
      </div>
    </div>
  )
}
