
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface SignInForm {
  username: string;
  password: string;
}

const initialForm: SignInForm = {
  username: '',
  password: '',
};

const SignIn = () => {
  const { signIn } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState<SignInForm>(initialForm);
  const [error, setError] = useState('');

  const { username, password } = form;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError('아이디와 비밀번호를 입력하세요.');
      return;
    }

    if (!signIn(username.trim(), password)) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    navigate('/');
  };

  return (
    <div className="sign-in">
      <h2>로그인</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="아이디를 입력하세요"
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="sign-in_error">{error}</p>}

        <button type="submit">로그인</button>
      </form>

      <p className="signup-link">
        아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
};

export default SignIn;
