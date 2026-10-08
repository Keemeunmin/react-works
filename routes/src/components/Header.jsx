import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/sign-in">로그인</Link>
      <Link to="/sign-up">회원가입</Link>
    </div>
  )
}

export default Header