
import React, { useState } from "react";
import type { Product, NewProduct } from "../types/product";
import { initialProducts } from "../datas/products";
import { ProductContext } from "./ProductContext";

const ProductProvider = ({ children }: { children: React.ReactNode }) => {

  // 상품 상태 관리
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // 상품 추가 함수
  const addProduct = (newProduct: NewProduct) => {
    const product: Product = {
      ...newProduct,
      id: Date.now()
    };

    setProducts([...products, product]);
  };

  // 상품 삭제 함수
  const removeProduct = (productId: number) => {
    setProducts(
      products.filter((product) => product.id !== productId)
    );
  };

  // 상품 수정 함수
  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, removeProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
