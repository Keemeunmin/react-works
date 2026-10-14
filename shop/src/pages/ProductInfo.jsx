import { useNavigate, useParams } from 'react-router-dom'
import products from '../data/products'

const ProductInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find(
    (p) => p.id === Number(id)
  )

  if (!product) {
    return (
      <section>
        <h2>상품을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate('/products')}>
          목록보기
        </button>
      </section>
    )
  }

  return (
    <section className="product-info">
      <h2>상품 정보</h2>

      <div className="product-details">
        <p>상품 ID: {id}</p>
        <p>상품 이름: {product.name}</p>
        <p>상품 가격: {product.price}원</p>
        <p>상품 설명: {product.description}</p>
      </div>

      <div className="btn-list">
        <button onClick={() => navigate('/products')}>
          목록보기
        </button>
      </div>
    </section>
  )
}

export default ProductInfo