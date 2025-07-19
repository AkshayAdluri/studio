
'use client'

import { useProductStore } from '@/store/products';
import { getCategoriesFromProducts } from '@/lib/products';
import type { Product, Category } from '@/store/products';
import CategoryFilters from '@/components/CategoryFilters';
import ProductGrid from '@/components/ProductGrid';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

const PRODUCTS_PER_PAGE = 12;

export default function Home() {
  const searchParams = useSearchParams();
  const allProducts = useProductStore((state) => state.products);
  const allCategories = getCategoriesFromProducts(allProducts);

  const searchTerm = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category');
  const selectedSubcategory = searchParams.get('subcategory');
  const currentPage = Number(searchParams.get('page')) || 1;

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

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );


  const getHeading = () => {
    if (searchTerm) return `Results for "${searchTerm}"`;
    if (selectedSubcategory) return selectedSubcategory;
    if (selectedCategory) return selectedCategory;
    return 'New Arrivals';
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div>
      <CategoryFilters allCategories={allCategories} />
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline capitalize">
        {getHeading()}
      </h1>
      <ProductGrid initialProducts={paginatedProducts} />

       {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href={createPageURL(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  href={createPageURL(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href={createPageURL(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
