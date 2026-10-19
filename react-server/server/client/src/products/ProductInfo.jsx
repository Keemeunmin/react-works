
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  // 상품 상세 정보 조회
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('상품 상세 조회 오류:', err);
        setError('상품 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 상품 삭제
  const handleDelete = async () => {
    const confirmed = window.confirm(
      '정말 이 상품을 삭제하시겠습니까?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(`/products/${id}`);

      alert('상품이 삭제되었습니다.');

      navigate('/');
    } catch (err) {
      console.error('상품 삭제 오류:', err);
      alert('상품 삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-container">
        <p>상품 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="detail-container">
        <p className="error">
          {error || '상품이 존재하지 않습니다.'}
        </p>
        <Link to="/" className="btn">
          목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <h2>상품 상세 정보</h2>

      <table className="detail-table">
        <tbody>
          <tr>
            <th>상품 ID</th>
            <td>{product.id}</td>
          </tr>

          <tr>
            <th>상품명</th>
            <td>{product.product_name}</td>
          </tr>

          <tr>
            <th>가격</th>
            <td>
              {Number(product.price).toLocaleString()}원
            </td>
          </tr>

          <tr>
            <th>상품 설명</th>
            <td>{product.description || '-'}</td>
          </tr>

          <tr>
            <th>등록일</th>
            <td>
              {product.created_at
                ? new Date(product.created_at).toLocaleString('ko-KR')
                : '-'}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="button-group">
        <Link to="/" className="btn btn-secondary">
          목록으로
        </Link>

        <Link
          to={`/products/${id}/edit`}
          className="btn"
        >
          수정
        </Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? '삭제 중...' : '삭제'}
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
