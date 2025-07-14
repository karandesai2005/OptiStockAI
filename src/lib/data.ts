'use server';

import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, writeBatch } from 'firebase/firestore';

// Define a type for our product document that aligns with Firestore's structure
export type Product = {
  id: string; // Firestore document ID
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

async function seedDatabase() {
  console.log('No products found, seeding initial data...');
  const initialProducts = [
    { name: 'Laptop', category: 'Electronics', stock: 500, forecastedDemand: 600 },
    { name: 'Headphones', category: 'Electronics', stock: 50, forecastedDemand: 200 },
    { name: 'T-Shirt', category: 'Apparel', stock: 2000, forecastedDemand: 1500 },
    { name: 'Smart Watch', category: 'Electronics', stock: 300, forecastedDemand: 350 },
    { name: 'Running Shoes', category: 'Apparel', stock: 800, forecastedDemand: 900 },
    { name: 'Yoga Mat', category: 'Sports', stock: 1200, forecastedDemand: 1000 },
    { name: 'Gardening Gloves', category: 'Home & Garden', stock: 1500, forecastedDemand: 1200 },
    { name: 'Sci-Fi Novel', category: 'Books', stock: 280, forecastedDemand: 250 },
  ];

  const batch = writeBatch(db);
  const productsCollection = collection(db, 'products');

  initialProducts.forEach((product) => {
    const docRef = doc(productsCollection); // Firestore generates a unique ID
    batch.set(docRef, product);
  });

  await batch.commit();
  console.log('Database seeded successfully.');
}

export async function getProducts(): Promise<Product[]> {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);

    if (snapshot.empty) {
        await seedDatabase();
        // Fetch again after seeding
        const newSnapshot = await getDocs(productsCollection);
        return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
}

export async function updateProductStock(productId: string, newStock: number): Promise<void> {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, { stock: newStock });
}
