import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <Link to="/">Home</Link>
      {' | '}
      <Link to="/products">상품 목록</Link>
    </header>
  )
}

export default Header