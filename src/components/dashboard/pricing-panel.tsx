'use client'
import { useEffect, useState, useMemo } from 'react'
import { Tag, Sparkles, ArrowDown, ArrowUp } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Product } from '@/lib/data'
import { cn } from '@/lib/utils'

interface PricingPanelProps {
  products: Product[]
}

type Suggestion = {
  productName: string
  suggestion: string
  reasoning: string
}

export function PricingPanel({ products }: PricingPanelProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)

  const memoizedProducts = useMemo(() => products, [products]);

  useEffect(() => {
    if (!memoizedProducts || memoizedProducts.length === 0) {
      setSuggestions([])
      return
    }

    const productForSuggestion = memoizedProducts[0];
    if (productForSuggestion) {
        let suggestionText = "Maintain Price"
        let reasoning = "Stock levels are balanced with forecasted demand."
        const stockDiff = productForSuggestion.stock - productForSuggestion.forecastedDemand

        if (stockDiff < -100) { // Significantly lower stock
            suggestionText = "+10%"
            reasoning = "Stock is significantly lower than forecasted demand. Increase price to maximize revenue."
        } else if (stockDiff > 200) { // Significantly higher stock
            suggestionText = "-15%"
            reasoning = "Stock is significantly higher than forecasted demand. Decrease price to clear excess inventory."
        }
        
        setSuggestions([{
            productName: productForSuggestion.name,
            suggestion: suggestionText,
            reasoning: reasoning
        }]);
    }
  }, [memoizedProducts])

  const renderSuggestionIcon = (suggestionText: string) => {
    const isIncrease = suggestionText.includes('+') || suggestionText.toLowerCase().includes('increase');
    const isDecrease = suggestionText.includes('-') || suggestionText.toLowerCase().includes('decrease');
    
    if (isIncrease) {
        return <ArrowUp className="h-4 w-4 text-green-500" />
    }
    if (isDecrease) {
        return <ArrowDown className="h-4 w-4 text-red-500" />
    }
    return <Tag className="h-4 w-4 text-muted-foreground" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          {products[0]?.name || 'Suggestion'}
        </CardTitle>
        <CardDescription>
          AI Pricing Suggestion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        ) : (
          suggestions.map((s, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={cn("mt-1 p-1.5 rounded-full",
                s.suggestion.includes('+') || s.suggestion.toLowerCase().includes('increase') ? 'bg-green-100 dark:bg-green-900/50' : '',
                s.suggestion.includes('-') || s.suggestion.toLowerCase().includes('decrease') ? 'bg-red-100 dark:bg-red-900/50' : 'bg-gray-100 dark:bg-gray-900/50',
              )}>
                {renderSuggestionIcon(s.suggestion)}
              </div>
              <div>
                <p className="font-semibold">
                  New Price: <span className={cn(
                     s.suggestion.includes('+') || s.suggestion.toLowerCase().includes('increase') ? 'text-green-600' : '',
                     s.suggestion.includes('-') || s.suggestion.toLowerCase().includes('decrease') ? 'text-red-600' : 'text-muted-foreground',
                  )}>{s.suggestion}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {s.reasoning}
                </p>
              </div>
            </div>
          ))
        )}
         { !loading && suggestions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No pricing suggestions at the moment.</p>
        )}
      </CardContent>
    </Card>
  )
}
