
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface SignUpForm {
  username: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
}

const initialForm: SignUpForm = {
  username: '',
  password: '',
  passwordConfirm: '',
  name: '',
  email: '',
};

const USERNAME_PATTERN = /^[a-z][a-z0-9]{3,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = () => {
  const { signUp } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState<SignUpForm>(initialForm);
  const [error, setError] = useState('');

  const { username, password, passwordConfirm, name, email } = form;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!USERNAME_PATTERN.test(username)) {
      setError('아이디는 영문 소문자로 시작하는 4~16자의 영문 소문자, 숫자로 입력하세요.');
      return;
    }

    if (password.length < 8) {
      setError('비밀번호는 8자 이상 입력하세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!name.trim()) {
      setError('이름을 입력하세요.');
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('이메일 형식이 올바르지 않습니다.');
      return;
    }

    const isSignedUp = signUp({
      username,
      password,
      name: name.trim(),
      email: email.trim(),
    });

    if (!isSignedUp) {
      setError('이미 사용 중인 아이디입니다.');
      return;
    }

    alert('회원가입을 완료했습니다. 로그인해 주세요.');
    navigate('/signin');
  };

  return (
    <div className="sign-in">
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="영문 소문자, 숫자 4~16자"
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
            placeholder="8자 이상"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleInputChange}
            placeholder="비밀번호를 한 번 더 입력하세요"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="이름을 입력하세요"
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            autoComplete="email"
          />
        </div>

        {error && <p className="sign-in_error">{error}</p>}

        <button type="submit">회원가입</button>
      </form>

      <p className="signup-link">
        이미 계정이 있으신가요? <Link to="/signin">로그인</Link>
      </p>
    </div>
  );
};

export default SignUp;
