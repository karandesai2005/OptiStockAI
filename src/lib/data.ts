'use server';

import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

// Define a type for our product document that aligns with MongoDB's structure
export type Product = {
  _id: ObjectId; // MongoDB's unique identifier
  id: string; // Keeping this for component key compatibility, will map from _id
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

async function getDb() {
    const client = await clientPromise;
    return client.db("optistock");
}

export async function getProducts(): Promise<Product[]> {
    const db = await getDb();
    const productsCollection = db.collection('products');
    let products = await productsCollection.find({}).toArray();

    // The initial data seeding logic
    if (products.length === 0) {
        console.log('No products found, seeding initial data...');
        const initialProducts = [
            { id_string: "PROD001", name: 'Laptop', category: 'Electronics', stock: 500, forecastedDemand: 600 },
            { id_string: "PROD002", name: 'Headphones', category: 'Electronics', stock: 50, forecastedDemand: 200 },
            { id_string: "PROD003", name: 'T-Shirt', category: 'Apparel', stock: 2000, forecastedDemand: 1500 },
            { id_string: "PROD004", name: 'Smart Watch', category: 'Electronics', stock: 300, forecastedDemand: 350 },
            { id_string: "PROD005", name: 'Running Shoes', category: 'Apparel', stock: 800, forecastedDemand: 900 },
            { id_string: "PROD006", name: 'Yoga Mat', category: 'Sports', stock: 1200, forecastedDemand: 1000 },
            { id_string: "PROD007", name: 'Gardening Gloves', category: 'Home & Garden', stock: 1500, forecastedDemand: 1200 },
            { id_string: "PROD008", name: 'Sci-Fi Novel', category: 'Books', stock: 280, forecastedDemand: 250 },
        ];
        await productsCollection.insertMany(initialProducts);
        // Fetch again after seeding
        products = await productsCollection.find({}).toArray();
    }
    
    return JSON.parse(JSON.stringify(products.map(p => ({ ...p, id: p._id.toString() })))) as Product[];
}

export async function updateProductStock(productId: string, newStock: number): Promise<void> {
    const db = await getDb();
    await db.collection('products').updateOne(
        { _id: new ObjectId(productId) },
        { $set: { stock: newStock } }
    );
}
