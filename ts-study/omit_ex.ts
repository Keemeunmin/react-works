type Product = {
  id: number;
  name: string;
  price: number;
};

// id를 제외한 나머지 속성 사용
const newProduct: Omit<Product, "id"> = {
  name: "노트북",
  price: 1200000,
};

console.log(newProduct);

export {};