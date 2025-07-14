'use client'
import { Boxes, Repeat, TriangleAlert } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface OverviewCardsProps {
  totalStock: number
  turnoverRate: number
  alertCount: number
}

export function OverviewCards({ totalStock, turnoverRate, alertCount }: OverviewCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          <Boxes className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStock.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">units across all categories</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stock Turnover</CardTitle>
          <Repeat className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{turnoverRate}x</div>
          <p className="text-xs text-muted-foreground">annually</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Alerts</CardTitle>
          <TriangleAlert className={`h-4 w-4 ${alertCount > 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${alertCount > 0 ? 'text-destructive' : ''}`}>{alertCount}</div>
          <p className="text-xs text-muted-foreground">low stock & overstock issues</p>
        </CardContent>
      </Card>
    </div>
  )
}
