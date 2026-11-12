
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import type { Category } from '../types/product';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [pName, setPName] = useState('');
  const [category, setCategory] = useState<Category>('마우스');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const priceNumber = Number(price);

    if (!pName.trim()) {
      setError('상품명을 입력하세요.');
      return;
    }

    if (
      !price ||
      !Number.isInteger(priceNumber) ||
      priceNumber <= 0
    ) {
      setError('가격은 1원 이상의 정수로 입력하세요.');
      return;
    }

    try {
      await addProduct({
        pName: pName.trim(),
        category,
        price: priceNumber,
        description: description.trim(),
        imageUrl: imageUrl.trim() || null,
      });

      alert('상품 등록 성공!');
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('상품 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="add-product">
      <h2>상품 등록</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>상품명</label>
          <input
            type="text"
            value={pName}
            onChange={(e) => setPName(e.target.value)}
          />
        </div>

        <div>
          <label>카테고리</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Category)
            }
          >
            <option value="마우스">마우스</option>
            <option value="키보드">키보드</option>
            <option value="모니터">모니터</option>
            <option value="주변기기">주변기기</option>
          </select>
        </div>

        <div>
          <label>가격</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>상품 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>이미지 경로</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/images/mouse.jpg"
          />
        </div>

        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        <button type="submit">상품 등록</button>

        <button
          type="button"
          onClick={() => navigate('/')}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
