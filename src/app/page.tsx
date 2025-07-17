
import { getProducts, getCategories } from '@/lib/products';
import type { Product } from '@/lib/products';
import CategoryFilters from '@/components/CategoryFilters';
import ProductGrid from '@/components/ProductGrid';

export default function Home({
  searchParams,
}: {
  searchParams?: { 
    q?: string;
    category?: string;
    subcategory?: string;
  };
}) {
  const allProducts: Product[] = getProducts();
  const allCategories = getCategories();

  const searchTerm = searchParams?.q || '';
  const selectedCategory = searchParams?.category;
  const selectedSubcategory = searchParams?.subcategory;

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSubcategory = selectedSubcategory
      ? product.subcategory === selectedSubcategory
      : true;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const getHeading = () => {
    if (searchTerm) return `Results for "${searchTerm}"`;
    if (selectedSubcategory) return selectedSubcategory;
    if (selectedCategory) return selectedCategory;
    return 'New Arrivals';
  }

  return (
    <div>
      <CategoryFilters allCategories={allCategories} />
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline capitalize">
        {getHeading()}
      </h1>
      <ProductGrid initialProducts={filteredProducts} />
    </div>
  );
}
