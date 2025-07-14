export type Product = {
  id: string;
  name: string;
  category: string;
  stock: number;
  forecastedDemand: number;
};

export type Alert = {
  id: string;
  type: 'low' | 'over';
  productName: string;
  currentStock: number;
  threshold: number;
  message: string;
};

export type StockTrendData = {
  date: string;
  stock: number;
};

export type DemandForecastData = {
  category: string;
  demand: number;
};

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

export const initialProducts: Product[] = [
    { id: "PROD001", name: 'Laptop', category: 'Electronics', stock: 500, forecastedDemand: 600 },
    { id: "PROD002", name: 'Headphones', category: 'Electronics', stock: 50, forecastedDemand: 200 },
    { id: "PROD003", name: 'T-Shirt', category: 'Apparel', stock: 2000, forecastedDemand: 1500 },
    { id: "PROD004", name: 'Smart Watch', category: 'Electronics', stock: 300, forecastedDemand: 350 },
    { id: "PROD005", name: 'Running Shoes', category: 'Apparel', stock: 800, forecastedDemand: 900 },
    { id: "PROD006", name: 'Yoga Mat', category: 'Sports', stock: 1200, forecastedDemand: 1000 },
    { id: "PROD007", name: 'Gardening Gloves', category: 'Home & Garden', stock: 1500, forecastedDemand: 1200 },
    { id: "PROD008", name: 'Sci-Fi Novel', category: 'Books', stock: 280, forecastedDemand: 250 },
];

export const initialDemandForecast: DemandForecastData[] = [
  { category: 'Electronics', demand: 2000 },
  { category: 'Apparel', demand: 3000 },
  { category: 'Home & Garden', demand: 1500 },
  { category: 'Sports', demand: 1200 },
  { category: 'Books', demand: 800 },
];

export const initialStockTrend: StockTrendData[] = generateStockTrend(90, 10236, 9752);

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

    // This alert ensures we have 3 as requested
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

export const initialAlerts = getAlerts(initialProducts);

export const calculateTotalStock = (products: Product[]) => products.reduce((acc, p) => acc + p.stock, 0);

export const initialTotalStock = calculateTotalStock(initialProducts);
export const initialTurnoverRate = 5.2;
