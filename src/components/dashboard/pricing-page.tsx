'use client'

import { PricingPanel } from './pricing-panel'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Product } from '@/lib/data'

interface PricingPageProps {
  products: Product[]
}

export default function PricingPage({ products }: PricingPageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic Pricing</CardTitle>
        <CardDescription>
          AI-powered pricing suggestions to optimize sales and inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <PricingPanel key={product.id} products={[product]} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
