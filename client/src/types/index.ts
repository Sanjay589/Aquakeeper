export type UserMode = 'beginner' | 'owner' | 'store';

export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export interface Aquarium {
  id: string;
  name: string;
  volume: number;
  volumeUnit: 'gallons' | 'liters';
  type: 'freshwater' | 'saltwater';
  healthScore: number; // 0 - 100
  createdDate: string;
  imageUrl?: string;
  fishCount: number;
  temperature: number;
  pH: number;
}

export interface Fish {
  id: string;
  aquariumId: string;
  name: string;
  species: string;
  age: number;
  ageUnit: 'months' | 'years';
  addedDate: string;
  status: 'healthy' | 'sick' | 'monitoring';
  lastFed: string;
}

export interface WaterReading {
  id: string;
  aquariumId: string;
  timestamp: string;
  pH: number;
  temperature: number;
  tempUnit: 'C' | 'F';
  ammonia: number; // ppm
  nitrite: number; // ppm
  nitrate: number; // ppm
  salinity?: number; // ppt
  alkalinity?: number; // dKH
  notes?: string;
}

export interface Reminder {
  id: string;
  aquariumId: string;
  title: string;
  type: 'feeding' | 'cleaning' | 'testing' | 'other';
  status: 'pending' | 'completed';
  dueDate: string;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  notes?: string;
}

export interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'animals' | 'products' | 'inventory';
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  quantity: number;
  price: number;
  sku: string;
  supplier?: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}
