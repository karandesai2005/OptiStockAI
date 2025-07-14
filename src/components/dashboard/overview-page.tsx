'use client'
import { useState, useEffect } from 'react'

import { OverviewCards } from './overview-cards'
import { StockTrendChart } from './stock-trend-chart'
import { DemandForecastChart } from './demand-forecast-chart'
import { ProductTable } from './product-table'
import { AlertsPanel } from './alerts-panel'
import { PricingPanel } from './pricing-panel'

import {
  initialStockTrend,
  initialTurnoverRate,
  initialDemandForecast,
  getAlerts,
  calculateTotalStock,
} from '@/lib/data-helpers'
import { updateProductStock, type Product, type Alert } from '@/lib/data'
import { Button } from '../ui/button'
import { RefreshCw } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface OverviewPageProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
}

export default function OverviewPage({ products, setProducts, alerts, setAlerts }: OverviewPageProps) {
  const [totalStock, setTotalStock] = useState(() => calculateTotalStock(products))

  useEffect(() => {
    setTotalStock(calculateTotalStock(products));
  }, [products]);

  const handleUpdateStock = async () => {
    const updatedProducts = await Promise.all(products.map(async (p) => {
      const newStock = Math.max(0, p.stock + Math.floor(Math.random() * 201) - 100); // Change stock by -100 to +100
      await updateProductStock(p.id, newStock);
      return {
        ...p,
        stock: newStock,
      }
    }));
    setProducts(updatedProducts);
    setAlerts(getAlerts(updatedProducts));
  }
  
  const pricingPanelProduct = products.find(p => p.stock < p.forecastedDemand) || products.find(p => p.stock > p.forecastedDemand) || products[0];

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
        <Card>
            <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>
                Overview of top-selling products and AI-powered suggestions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ProductTable products={products.slice(0, 5)} />
            </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-2">
        {pricingPanelProduct && <PricingPanel products={[pricingPanelProduct]} />}
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
