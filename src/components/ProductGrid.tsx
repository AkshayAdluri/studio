
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/products';

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const searchParams = useSearchParams();

  // This useEffect ensures the grid updates when the initialProducts prop changes
  // due to filtering on the parent page component.
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts, searchParams]);

  if (products.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">No products found for your selection.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
