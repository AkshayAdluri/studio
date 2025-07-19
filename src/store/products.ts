
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialProducts } from '@/lib/products';

let nextId = initialProducts.length > 0 ? Math.max(...initialProducts.map(p => p.id)) + 1 : 1;

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  subcategory: string;
  stock: number;
  description: string;
  dataAiHint?: string;
}

export interface Category {
  name: string;
  subcategories: string[];
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  getProductById: (id: number) => Product | undefined;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) => {
        const newProduct = { ...product, id: nextId++ };
        set((state) => ({ products: [...state.products, newProduct] }));
      },
      getProductById: (id: number) => {
        return get().products.find(p => p.id === id);
      },
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
