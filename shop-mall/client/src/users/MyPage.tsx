
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function MyPage() {
  const { user } = useUser();

  // 로그인하지 않은 경우 로그인 페이지로 이동
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h2>마이페이지</h2>

      <h3>{user.name}님, 환영합니다!</h3>

      <hr />

      <h3>내 정보</h3>

      <p>아이디: {user.username}</p>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>

      <hr />

      <h3>회원 관리</h3>

      <ul>
        <li>
          <Link to="/mypage/edit">
            회원정보 변경
          </Link>
        </li>

        <li>
          비밀번호 변경 (준비 중)
        </li>

        <li>
          주문 내역 조회 (준비 중)
        </li>

        <li>
          회원 탈퇴 (준비 중)
        </li>
      </ul>

      <hr />

      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}
