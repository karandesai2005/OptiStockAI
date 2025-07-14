'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { Product } from '@/lib/data'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
    const [suggestions, setSuggestions] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    
    const memoizedProducts = useMemo(() => products, [products]);

    useEffect(() => {
        if (memoizedProducts.length === 0) return;

        const newSuggestions: Record<string, string> = {};
        memoizedProducts.forEach(product => {
            const stockDiff = product.stock - product.forecastedDemand;
            if (stockDiff < -100) {
                newSuggestions[product.id] = "+10%";
            } else if (stockDiff > 200) {
                newSuggestions[product.id] = "-15%";
            } else {
                newSuggestions[product.id] = "Hold";
            }
        });
  
        setSuggestions(newSuggestions);
      }, [memoizedProducts]);

  const renderSuggestion = (suggestion: string) => {
    const isIncrease = suggestion.includes('+') || suggestion.toLowerCase().includes('increase')
    const isDecrease = suggestion.includes('-') || suggestion.toLowerCase().includes('decrease')
    
    if (isIncrease) {
        return <Badge variant="outline" className="text-green-600 border-green-600/50"><ArrowUp className="mr-1 h-3 w-3" />{suggestion}</Badge>
    }
    if (isDecrease) {
        return <Badge variant="outline" className="text-red-600 border-red-600/50"><ArrowDown className="mr-1 h-3 w-3" />{suggestion}</Badge>
    }
    return <Badge variant="secondary">{suggestion || "Hold"}</Badge>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Current Stock</TableHead>
          <TableHead className="text-right">Forecasted Demand</TableHead>
          <TableHead className="text-right">Suggested Price Adjustment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memoizedProducts.map((product) => (
          <TableRow key={product.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="text-right">{product.stock.toLocaleString()}</TableCell>
            <TableCell className="text-right">{product.forecastedDemand.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {loading ? (
                <Skeleton className="h-5 w-24 ml-auto" />
              ) : (
                renderSuggestion(suggestions[product.id] || '')
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
