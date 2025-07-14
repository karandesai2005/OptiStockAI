'use client'

import { ProductTable } from './product-table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Product } from '@/lib/data'

interface InventoryPageProps {
  products: Product[]
}

export default function InventoryPage({ products }: InventoryPageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>
          A complete list of all products in your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductTable products={products} />
      </CardContent>
    </Card>
  )
}
