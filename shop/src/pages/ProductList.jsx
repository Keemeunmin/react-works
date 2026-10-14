import products from '../data/products'
import { Link } from 'react-router-dom'

const ProductList = () => {
  return (
    <div className="product-list">
      <h2>상품 리스트</h2>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>
              <Link to={`/products/${product.id}`}>
                {product.name}
              </Link>
            </h3>
            <p>가격: {product.price}원</p>
            <p>설명: {product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList