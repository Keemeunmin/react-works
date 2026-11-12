
export type Category = "마우스" | "키보드" | "모니터" | "주변기기";

export interface Product {
  id: number;
  pName: string;
  category: Category;
  price: number;
  description: string;
  imageUrl?: string | null;
}

// 상품 등록 시 id는 자동으로 부여하므로 제외
export type NewProduct = Omit<Product, "id">;
