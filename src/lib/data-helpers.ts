import type { Product, Alert, StockTrendData, DemandForecastData } from '@/lib/data';

// This function is synchronous and can be used on the client side.
export const getAlerts = (products: Product[]): Alert[] => {
    const alerts: Alert[] = [];
    
    const headphones = products.find(p => p.name === 'Headphones');
    if (headphones && headphones.stock < 100) {
        alerts.push({
            id: 'ALERT001',
            type: 'low',
            productName: 'Headphones',
            currentStock: headphones.stock,
            threshold: 100,
            message: `Low stock for Headphones. Current: ${headphones.stock}, Threshold: 100.`
        });
    }

    const tShirt = products.find(p => p.name === 'T-Shirt');
    if (tShirt && tShirt.stock > 1500) {
        alerts.push({
            id: 'ALERT002',
            type: 'over',
            productName: 'T-Shirt',
            currentStock: tShirt.stock,
            threshold: 1500,
            message: `Overstock for T-Shirt. Current: ${tShirt.stock}, Threshold: 1500.`
        });
    }

    const yogaMat = products.find(p => p.name === 'Yoga Mat');
    if (yogaMat && yogaMat.stock > 1000) {
        alerts.push({
            id: 'ALERT003',
            type: 'over',
            productName: 'Yoga Mat',
            currentStock: yogaMat.stock,
            threshold: 1000,
            message: `Overstock for Yoga Mat. Current: ${yogaMat.stock}, Threshold: 1000.`
        });
    }
    
    return alerts;
};

// This function is synchronous and can be used on the client side.
export const calculateTotalStock = (products: Product[]) => products.reduce((acc, p) => acc + p.stock, 0);


const generateStockTrend = (days: number, startStock: number, endStock: number): StockTrendData[] => {
    const trend: StockTrendData[] = [];
    const stockChangePerDay = (endStock - startStock) / (days - 1);
    
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        
        const stockLevel = startStock + (stockChangePerDay * i);
        const randomFactor = (Math.random() - 0.5) * (startStock * 0.02);
        
        trend.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            stock: Math.round(stockLevel + randomFactor),
        });
    }
    return trend;
};


// Static data that can be safely exported for client-side use.
export const initialDemandForecast: DemandForecastData[] = [
  { category: 'Electronics', demand: 2000 },
  { category: 'Apparel', demand: 3000 },
  { category: 'Home & Garden', demand: 1500 },
  { category: 'Sports', demand: 1200 },
  { category: 'Books', demand: 800 },
];

export const initialStockTrend: StockTrendData[] = generateStockTrend(90, 10236, 9752);

export const initialTurnoverRate = 5.2;
