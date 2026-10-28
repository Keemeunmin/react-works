const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <p>{product.category}</p>
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  )
}

export default ProductCard

