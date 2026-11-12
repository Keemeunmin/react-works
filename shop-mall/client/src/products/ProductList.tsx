
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductList = () => {
  const { products } = useProducts();

  return (
    <div className="product-list-page">
      <h2>상품 목록</h2>

      <div className="product-grid">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <div className="product-image-box">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.pName}
                  className="product-image"
                />
              ) : (
                <div className="no-image">
                  이미지 없음
                </div>
              )}
            </div>

            <div className="product-info">
              <span className="product-category">
                {product.category}
              </span>

              <h3>{product.pName}</h3>

              <p className="product-price">
                {product.price.toLocaleString()}원
              </p>

              <p className="product-description">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p>등록된 상품이 없습니다.</p>
      )}
    </div>
  );
};

export default ProductList;
