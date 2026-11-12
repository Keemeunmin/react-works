
import api from './api';
import type { Category, NewProduct, Product } from '../types/product';

// PostgreSQL 상품 데이터 타입
interface ProductRow {
  id: number;
  p_name: string;
  category: Category;
  price: number;
  description: string;
  image_url: string | null;
}

// DB 데이터를 React 타입으로 변환
const toProduct = (row: ProductRow): Product => ({
  id: row.id,
  pName: row.p_name,
  category: row.category,
  price: row.price,
  description: row.description,
  imageUrl: row.image_url,
});

// 상품 전체 조회
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductRow[]>('/products');

  return response.data.map(toProduct);
};

// 상품 하나 조회
export const getProductById = async (
  id: number
): Promise<Product | undefined> => {
  const response = await api.get<ProductRow | null>(
    `/products/${id}`
  );

  if (!response.data) {
    return undefined;
  }

  return toProduct(response.data);
};

// 상품 등록
export const createProduct = async (
  product: NewProduct
): Promise<void> => {
  await api.post('/products', {
    pName: product.pName,
    category: product.category,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl || null,
  });
};
