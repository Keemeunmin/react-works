
import { useEffect, useState, type ReactNode } from 'react';
import { ProductContext } from './ProductContext';
import { createProduct, getProducts } from '../api/products';
import type { NewProduct, Product } from '../types/product';

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // 처음 화면이 나타날 때 DB에서 상품 목록 가져오기
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.log('상품 목록 조회 오류!', err));
  }, []);

  // 상품을 DB에 저장한 후 목록 다시 가져오기
  const addProduct = async (product: NewProduct) => {
    await createProduct(product);
    setProducts(await getProducts());
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
