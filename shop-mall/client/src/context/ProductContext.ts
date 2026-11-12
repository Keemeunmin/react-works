
import { createContext, useContext } from 'react';
import type { NewProduct, Product } from '../types/product';

interface ProductContextValue {
  products: Product[];
  addProduct: (product: NewProduct) => Promise<void>;
}

export const ProductContext =
  createContext<ProductContextValue | null>(null);

// 상품 Context 사용
export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      'useProducts는 ProductProvider 안에서 사용해야 합니다.'
    );
  }

  return context;
};

// 기존 CartProvider와 호환되도록 추가
export const useProduct = useProducts;
