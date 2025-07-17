import { getProducts } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import type { Product } from '@/lib/products';

export default function Home({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const allProducts: Product[] = getProducts();
  const searchTerm = searchParams?.q || '';

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">
        {searchTerm ? `Results for "${searchTerm}"` : 'New Arrivals'}
      </h1>
      <ProductGrid initialProducts={allProducts} />
    </div>
  );
}
