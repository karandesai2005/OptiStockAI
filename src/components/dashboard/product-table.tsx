'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { suggestPriceAdjustment } from '@/ai/flows/suggest-price-adjustment'
import type { Product } from '@/lib/data'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
    const [suggestions, setSuggestions] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const fetchSuggestions = async () => {
          setLoading(prev => {
            const newLoading = {...prev};
            products.forEach(p => newLoading[p.id] = true);
            return newLoading;
          });
          
          const newSuggestions: Record<string, string> = {};
          
          await Promise.all(products.map(async (product) => {
            try {
              const result = await suggestPriceAdjustment({
                productName: product.name,
                currentStock: product.stock,
                forecastedDemand: product.forecastedDemand,
              });
              newSuggestions[product.id] = result.suggestedPriceAdjustment;
            } catch (error) {
              console.error(`Failed to get suggestion for ${product.name}`, error);
              newSuggestions[product.id] = "Error";
            }
          }));
    
          setSuggestions(newSuggestions);
          setLoading({});
        };
    
        if (products.length > 0) {
          fetchSuggestions();
        }
      }, [products]);

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
        {products.map((product) => (
          <TableRow key={product.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="text-right">{product.stock.toLocaleString()}</TableCell>
            <TableCell className="text-right">{product.forecastedDemand.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {loading[product.id] ? (
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
