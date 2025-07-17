
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import type { Category } from '@/lib/products';

interface CategoryFiltersProps {
  allCategories: Category[];
}

export default function CategoryFilters({ allCategories }: CategoryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const selectedCategory = searchParams.get('category');
  const selectedSubcategory = searchParams.get('subcategory');

  const handleFilterChange = (key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (key === 'category') {
      current.delete('subcategory'); // Reset subcategory when category changes
      if (value) {
        current.set('category', value);
      } else {
        current.delete('category');
      }
    } else if (key === 'subcategory') {
        if (value) {
            current.set('subcategory', value);
        } else {
            current.delete('subcategory');
        }
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const currentCategoryData = allCategories.find(c => c.name === selectedCategory);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!selectedCategory ? 'default' : 'outline'}
          onClick={() => handleFilterChange('category', null)}
        >
          All
        </Button>
        {allCategories.map(category => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? 'default' : 'outline'}
            onClick={() => handleFilterChange('category', category.name)}
            className="capitalize"
          >
            {category.name}
          </Button>
        ))}
      </div>
      {selectedCategory && currentCategoryData && (
        <div className="flex flex-wrap gap-2 border-t pt-4">
           <Button
            variant={!selectedSubcategory ? 'secondary' : 'outline'}
            onClick={() => handleFilterChange('subcategory', null)}
            size="sm"
          >
            All {selectedCategory}
          </Button>
          {currentCategoryData.subcategories.map(subcategory => (
            <Button
              key={subcategory}
              variant={selectedSubcategory === subcategory ? 'secondary' : 'outline'}
              onClick={() => handleFilterChange('subcategory', subcategory)}
              size="sm"
              className="capitalize"
            >
              {subcategory}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
