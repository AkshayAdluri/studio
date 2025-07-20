
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { PlusCircle, Loader2 } from 'lucide-react';
import { ProductsTable } from './ProductsTable';
import { ProductForm, FormValues } from './ProductForm';
import { useProductStore, type Product } from '@/store/products';
import { useToast } from '@/hooks/use-toast';

export default function ProductsClient() {
  const { products, addProduct, updateProduct } = useProductStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const isEditMode = !!editingProduct;
  const formId = "product-form";

  const handleAddClick = () => {
    setEditingProduct(undefined);
    setIsDialogOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingProduct(undefined);
    }
  };

  function handleFormSubmit(values: FormValues) {
    setIsSaving(true);
    // In a real app, this would be an API call. Here we simulate it.
    setTimeout(() => {
      if (isEditMode) {
        updateProduct({ ...values, id: editingProduct.id });
        toast({
          title: 'Product Updated',
          description: `${values.name} has been updated.`,
        });
      } else {
        addProduct(values);
        toast({
          title: 'Product Added',
          description: `${values.name} has been added to your store.`,
        });
      }
      setIsSaving(false);
      setIsDialogOpen(false);
    }, 500);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your store's products.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick}>
              <PlusCircle className="mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto p-6">
                <ProductForm
                  formId={formId}
                  onSubmit={handleFormSubmit}
                  initialData={editingProduct}
                />
            </div>
            <DialogFooter className="p-6 pt-4 border-t">
              <Button type="submit" form={formId} className="w-full" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 animate-spin" /> : null}
                {isSaving ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Product')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ProductsTable data={products} onEdit={handleEditClick} />
    </>
  );
}
