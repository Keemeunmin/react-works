
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import { CartContext } from './CartContext';
import type { CartItem } from './CartContext';

interface Props {
  children: ReactNode;
}

export default function CartProvider({ children }: Props) {

  // 저장된 장바구니 불러오기
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');

      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('장바구니 불러오기 실패:', error);
    }

    return [];
  });

  // 장바구니가 변경될 때마다 저장
  useEffect(() => {
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // 장바구니에 상품 추가
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  // 수량 증가
  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // 수량 감소
  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // 상품 삭제
  const removeFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== id)
    );
  };

  // 장바구니 전체 비우기
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
