import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>SPACE SHOP</h1>
      </Link>

      <nav>
        <Link to="/">상품목록</Link>
        <Link to="/notice">공지사항</Link>
      </nav>
    </header>
  )
}

export default Header


