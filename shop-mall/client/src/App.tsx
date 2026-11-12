
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
import EditProfile from './users/EditProfile';

import ProductProvider from './context/ProductProvider';
import CartProvider from './context/CartProvider';
import UserProvider from './context/UserProvider';
import { useUser } from './context/UserContext';

import './App.css';

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
        <Link to="/product/new">상품 등록</Link>
        {' | '}
        <Link to="/cart">장바구니</Link>
        {' | '}

        {user ? (
          <>
            <span>{user.name}님 환영합니다!</span>
            {' | '}
            <Link to="/mypage">회원정보 변경</Link>
            {' | '}
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            {' | '}
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <Header />

            <main>
              <Routes>
                <Route
                  path="/"
                  element={<ProductList />}
                />

                <Route
                  path="/product/new"
                  element={<AddProduct />}
                />

                <Route
                  path="/product/:id"
                  element={<ProductDetail />}
                />

                <Route
                  path="/cart"
                  element={<Cart />}
                />

                <Route
                  path="/login"
                  element={<SignIn />}
                />

                <Route
                  path="/signin"
                  element={<SignIn />}
                />

                <Route
                  path="/signup"
                  element={<SignUp />}
                />

                <Route
                  path="/mypage"
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
