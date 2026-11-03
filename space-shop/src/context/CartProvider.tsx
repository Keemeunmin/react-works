
import React, { useState } from 'react';
import type { CartItem } from '../types/cart';
import { CartContext } from './CartContext';
import { useProduct } from './ProductContext';

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { products } = useProduct();

  // 장바구니에 상품 추가
  const addToCart = (productId: number, qty: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, qty: item.qty + qty }
            : item
        );
      } else {
        return [...prevItems, { productId, qty }];
      }
    });
  };

  // 장바구니 수량 변경
  const updateQuantity = (productId: number, qty: number) => {
    if (qty < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, qty } : item
      )
    );
  };

  // 장바구니 상품 삭제
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  // 총 수량 계산
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.qty, 0
  );

  // 총 가격 계산
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products.find(
      (p) => p.id === item.productId
    );

    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  // 장바구니 전체 비우기
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      totalQuantity,
      totalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
