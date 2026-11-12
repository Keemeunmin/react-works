
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function EditProfile() {
  const { user, updateProfile } = useUser();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setMessage('');
    setLoading(true);

    try {
      await updateProfile({ name, email });
      setMessage('회원정보가 변경되었습니다.');
    } catch (err) {
      console.error(err);
      setError('회원정보 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>회원정보 변경</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">아이디</label>
          <input
            id="username"
            type="text"
            value={user.username}
            disabled
          />
        </div>

        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p>{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? '저장 중...' : '변경사항 저장'}
        </button>
      </form>

      <p>
        <Link to="/">홈으로 돌아가기</Link>
      </p>
    </div>
  );
}
