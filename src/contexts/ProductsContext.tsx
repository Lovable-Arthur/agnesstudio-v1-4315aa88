
import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types/comanda';

interface ProductsContextType {
  products: Product[];
  getActiveProducts: () => Product[];
  getProductById: (id: number) => Product | undefined;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const mockProducts: Product[] = [
  { id: 1, name: 'Shampoo Premium', price: 45.00, category: 'Produtos', stock: 10, active: true },
  { id: 2, name: 'Condicionador', price: 38.00, category: 'Produtos', stock: 8, active: true },
  { id: 3, name: 'Máscara Capilar', price: 65.00, category: 'Produtos', stock: 5, active: true },
  { id: 4, name: 'Óleo Capilar', price: 55.00, category: 'Produtos', stock: 12, active: true },
];

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const getActiveProducts = () => products.filter(p => p.active);

  const getProductById = (id: number) => products.find(p => p.id === id);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{
      products,
      getActiveProducts,
      getProductById,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
