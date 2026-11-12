
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import ProductList from './products/ProductList';
import ProductDetail from './products/ProductDetail';
import AddProduct from './products/AddProduct';
import Cart from './products/Cart';

import SignIn from './users/SignIn';
import SignUp from './users/SignUp';
import MyPage from './users/MyPage';
import EditProfile from './users/EditProfile';

import ProductProvider from './context/ProductProvider';
import CartProvider from './context/CartProvider';
import UserProvider from './context/UserProvider';
import { useUser } from './context/UserContext';

import './App.css';

// 상단 메뉴
function Header() {
  const { user, logout } = useUser();

  return (
    <header>
      <h1>
        <Link to="/">SPACE SHOP</Link>
      </h1>

      <nav>
        <Link to="/">상품 목록</Link>
        {' | '}

        <Link to="/product/new">
          상품 등록
        </Link>
        {' | '}

        <Link to="/cart">
          장바구니
        </Link>
        {' | '}

        {user ? (
          <>
            <span>{user.name}님 환영합니다!</span>
            {' | '}

            <Link to="/mypage">
              마이페이지
            </Link>
            {' | '}

            <button
              type="button"
              onClick={logout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              로그인
            </Link>
            {' | '}

            <Link to="/signup">
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

// 메인 App
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <Header />

            <main>
              <Routes>
                {/* 상품 목록 */}
                <Route
                  path="/"
                  element={<ProductList />}
                />

                {/* 상품 등록 */}
                <Route
                  path="/product/new"
                  element={<AddProduct />}
                />

                {/* 상품 상세 */}
                <Route
                  path="/product/:id"
                  element={<ProductDetail />}
                />

                {/* 장바구니 */}
                <Route
                  path="/cart"
                  element={<Cart />}
                />

                {/* 로그인 */}
                <Route
                  path="/login"
                  element={<SignIn />}
                />

                <Route
                  path="/signin"
                  element={<SignIn />}
                />

                {/* 회원가입 */}
                <Route
                  path="/signup"
                  element={<SignUp />}
                />

                {/* 마이페이지 */}
                <Route
                  path="/mypage"
                  element={<MyPage />}
                />

                {/* 회원정보 변경 */}
                <Route
                  path="/mypage/edit"
                  element={<EditProfile />}
                />
              </Routes>
            </main>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

