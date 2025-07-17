
import { getProducts, getCategories } from '@/lib/products';
import type { Product } from '@/lib/products';
import CategoryFilters from '@/components/CategoryFilters';
import ProductGrid from '@/components/ProductGrid';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const PRODUCTS_PER_PAGE = 12;

export default function Home({
  searchParams,
}: {
  searchParams?: { 
    q?: string;
    category?: string;
    subcategory?: string;
    page?: string;
  };
}) {
  const allProducts: Product[] = getProducts();
  const allCategories = getCategories();

  const searchTerm = searchParams?.q || '';
  const selectedCategory = searchParams?.category;
  const selectedSubcategory = searchParams?.subcategory;
  const currentPage = Number(searchParams?.page) || 1;

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
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedSubcategory) params.set('subcategory', selectedSubcategory);
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
