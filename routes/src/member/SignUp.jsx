import { useState } from 'react'

function SignUp() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('회원가입 버튼을 클릭했습니다.')
  }

  return (
    <div className='signup'>
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit}>
        <p>
          이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </p>

        <p>
          아이디:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </p>

        <p>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>

        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default SignUp