'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/products';

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchTerm = searchParams.get('q')?.toLowerCase() || '';
    if (searchTerm) {
      const filtered = initialProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(initialProducts);
    }
  }, [searchParams, initialProducts]);

  if (filteredProducts.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No products found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
