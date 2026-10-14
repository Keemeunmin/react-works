
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'

import Home from './member/Home'
import SignIn from './member/SignIn'
import SignUp from './member/SignUp'

import About from './pages/About'
import Board from './pages/Board'
import BoardDetail from './pages/BoardDetail'

import './App.css'

function AppContent() {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLogin(false)
    alert('로그아웃 되었습니다.')
    navigate('/')
  }

  return (
    <>
      <nav className="header">
        <Link to="/">Home</Link>

        {isLogin ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <>
            <Link to="/sign-in">로그인</Link>
            <Link to="/sign-up">회원가입</Link>
          </>
        )}

        <Link to="/about">소개</Link>
        <Link to="/board">게시판</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/sign-in"
          element={<SignIn setIsLogin={setIsLogin} />}
        />

        <Route
          path="/sign-up"
          element={<SignUp />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/board" element={<Board />} />

        <Route
          path="/board/:id"
          element={<BoardDetail />}
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

