
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/api';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // 기존 상품 정보 불러오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const product = response.data;

        setProductName(product.product_name);
        setPrice(String(product.price));
        setDescription(product.description || '');
      } catch (err) {
        console.error('상품 조회 오류:', err);
        setError('상품 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 수정 버튼 클릭
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim() || price === '') {
      alert('상품명과 가격을 입력해 주세요.');
      return;
    }

    if (!Number.isInteger(Number(price)) || Number(price) < 0) {
      alert('가격은 0 이상의 정수로 입력해 주세요.');
      return;
    }

    try {
      setSaving(true);

      await api.put(`/products/${id}`, {
        productName: productName.trim(),
        price: Number(price),
        description,
      });

      alert('상품이 수정되었습니다.');

      navigate(`/products/${id}`);
    } catch (err) {
      console.error('상품 수정 오류:', err);
      alert('상품 수정에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="form-container">
        <p>상품 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <p className="error">{error}</p>
        <Link to="/" className="btn">
          목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>상품 수정</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <label htmlFor="productName">상품명</label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          maxLength={20}
        />

        <label htmlFor="price">가격</label>
        <input
          id="price"
          type="number"
          min="0"
          step="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="description">상품 설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        <div className="button-group">
          <button
            type="submit"
            className="btn"
            disabled={saving}
          >
            {saving ? '저장 중...' : '수정 완료'}
          </button>

          <Link
            to={`/products/${id}`}
            className="btn btn-secondary"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
