
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // 장바구니 총금액 계산
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // 장바구니 전체 상품 수량
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <h2>장바구니</h2>

      {cartItems.length === 0 ? (
        <div>
          <p>장바구니가 비어 있습니다.</p>
          <Link to="/">상품 보러 가기</Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.product.id}>

              {item.product.imageUrl && (
                <img
                  src={item.product.imageUrl}
                  alt={item.product.pName}
                  width="120"
                />
              )}

              <h3>{item.product.pName}</h3>

              <p>
                가격: {item.product.price.toLocaleString()}원
              </p>

              <div>
                <button
                  onClick={() =>
                    decreaseQuantity(item.product.id)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span style={{ margin: '0 15px' }}>
                  {item.quantity}개
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.product.id)
                  }
                >
                  +
                </button>
              </div>

              <p>
                소계:{' '}
                {(
                  item.product.price * item.quantity
                ).toLocaleString()}
                원
              </p>

              <button
                onClick={() =>
                  removeFromCart(item.product.id)
                }
              >
                삭제
              </button>

              <hr />
            </div>
          ))}

          <h3>총 상품 수량: {totalQuantity}개</h3>

          <h3>
            총금액: {totalPrice.toLocaleString()}원
          </h3>

          <button onClick={clearCart}>
            장바구니 비우기
          </button>

          <div>
            <Link to="/">쇼핑 계속하기</Link>
          </div>
        </>
      )}
    </div>
  );
}

