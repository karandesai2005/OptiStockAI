'use client'
import { TriangleAlert } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Alert } from '@/lib/data'

interface AlertsPanelProps {
  alerts: Alert[]
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Alerts</CardTitle>
        <CardDescription>Notifications for critical inventory levels.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No active alerts. System is stable.</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4">
              <div className={`mt-1 p-1.5 rounded-full ${alert.type === 'low' ? 'bg-red-100 dark:bg-red-900/50' : 'bg-amber-100 dark:bg-yellow-900/50'}`}>
                 <TriangleAlert className={`h-4 w-4 ${alert.type === 'low' ? 'text-red-600' : 'text-amber-600'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{alert.productName}</p>
                   <Badge variant={alert.type === 'low' ? 'destructive' : 'secondary'} className={alert.type === 'over' ? "bg-amber-500/80 hover:bg-amber-500 text-white" : ""}>
                    {alert.type === 'low' ? 'Low Stock' : 'Overstock'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {alert.message}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
