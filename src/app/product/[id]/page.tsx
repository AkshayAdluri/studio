

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductPageClient from './ProductPageClient';
import { ChevronRight } from 'lucide-react';

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  if (isNaN(productId)) {
    notFound();
  }
  
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/?category=${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/?category=${product.category}&subcategory=${product.subcategory}`} className="hover:text-primary capitalize">{product.subcategory}</Link>
      </div>
      <Card>
        <div className="grid md:grid-cols-2 gap-8">
          <CardHeader className="p-0">
            <div className="aspect-square relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={product.dataAiHint}
              />
            </div>
          </CardHeader>
          <div className="flex flex-col p-6">
            <CardTitle className="text-3xl font-bold font-headline mb-2">{product.name}</CardTitle>
            <p className="text-muted-foreground text-sm mb-4 capitalize">{product.category} / {product.subcategory}</p>
            <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
            <CardContent className="p-0 mb-6 flex-grow">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
            <ProductPageClient product={product} />
          </div>
        </div>
      </Card>
    </div>
  );
}
