
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignIn({ setIsLogin }) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (id === 'admin' && password === '1234') {
      setIsLogin(true)
      setError('')
      alert('로그인에 성공했습니다!')
      navigate('/')
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <div className="login">
      <h2>로그인</h2>
      <h4>♥로그인 하고 치이카와를 만나보세요♥</h4>

      <form onSubmit={handleLogin}>
        <p>
          아이디
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </p>

        <p>
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <button type="submit">로그인</button>
      </form>
    </div>
  )
}

export default SignIn

