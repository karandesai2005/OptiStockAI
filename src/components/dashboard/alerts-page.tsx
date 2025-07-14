'use client'

import { AlertsPanel } from './alerts-panel'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Alert } from '@/lib/data'

interface AlertsPageProps {
  alerts: Alert[]
}

export default function AlertsPage({ alerts }: AlertsPageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
        <CardDescription>
          Critical notifications about your inventory status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertsPanel alerts={alerts} />
      </CardContent>
    </Card>
  )
}
