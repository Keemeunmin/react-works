
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const loadProduct = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getProductById(Number(id));
      setProduct(data ?? null);

    } catch (err) {
      console.error(err);
      setError('상품 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    loadProduct();
  } else {
    setLoading(false);
    setError('상품 번호가 없습니다.');
  }
}, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    alert('장바구니에 상품을 담았습니다!');
  };

  if (loading) {
    return <p>상품 정보를 불러오는 중...</p>;
  }

  if (error || !product) {
    return <p>{error || '상품을 찾을 수 없습니다.'}</p>;
  }

  return (
    <div className="product-detail">
      <h2>상품 상세 정보</h2>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.pName}
          className="product-detail-image"
        />
      )}

      <h3>{product.pName}</h3>

      <p>카테고리: {product.category}</p>

      <p>가격: {product.price.toLocaleString()}원</p>

      <p>설명: {product.description}</p>

      <button
        type="button"
        onClick={handleAddToCart}
        className="add-cart-btn"
      >
        장바구니 담기
      </button>

      <div>
        <Link to="/cart">장바구니 보기</Link>
      </div>

      <div>
        <Link to="/">상품 목록으로 돌아가기</Link>
      </div>
    </div>
  );
}

