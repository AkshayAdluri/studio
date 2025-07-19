
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { ProductsTable } from './ProductsTable';
import { AddProductForm } from './AddProductForm';
import { useProductStore } from '@/store/products';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ProductsClient() {
  const { products } = useProductStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your store's products.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-grow pr-6 -mr-6">
                 <AddProductForm setDialogOpen={setIsAddDialogOpen} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <ProductsTable data={products} />
    </>
  );
}
