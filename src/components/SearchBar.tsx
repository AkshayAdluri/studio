'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { generateSearchSuggestions } from '@/ai/flows/generate-search-suggestions';
import { getCategories } from '@/lib/products';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  const categories = getCategories();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    router.push(`/?q=${encodeURIComponent(suggestion)}`);
    setIsFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const result = await generateSearchSuggestions({ searchTerm, productCategories: categories });
        setSuggestions(result.suggestions);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, categories]);

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
        </div>
      </form>
      {isFocused && (searchTerm || suggestions.length > 0 || isLoading) && (
        <Card className="absolute top-full mt-2 w-full z-50 p-2">
          {isLoading && (
            <div className="space-y-2 p-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          )}
          {!isLoading && suggestions.length > 0 && (
            <ul>
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    className="w-full text-left p-2 rounded-md hover:bg-accent/50"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!isLoading && searchTerm && suggestions.length === 0 && (
             <p className="p-2 text-sm text-muted-foreground">No suggestions found.</p>
          )}
        </Card>
      )}
    </div>
  );
}
