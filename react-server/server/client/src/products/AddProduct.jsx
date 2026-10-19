
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';

function AddProduct() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

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

      await api.post('/products', {
        productName: productName.trim(),
        price: Number(price),
        description,
      });

      alert('상품이 등록되었습니다.');

      navigate('/');
    } catch (err) {
      console.error('상품 등록 오류:', err);
      alert('상품 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-container">
      <h2>상품 등록</h2>

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
            {saving ? '등록 중...' : '상품 등록'}
          </button>

          <Link to="/" className="btn btn-secondary">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

