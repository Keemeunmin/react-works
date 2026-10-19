
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import ProductList from './products/ProductList';
import AddProduct from './products/AddProduct';
import ProductInfo from './products/ProductInfo';
import UpdateProduct from './products/UpdateProduct';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>상품 관리 시스템</h1>
          <p>React + Express + MySQL</p>

          <nav className="navigation">
            <Link to="/">상품 목록</Link>
            <Link to="/products/add">상품 등록</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />

            <Route
              path="/products/add"
              element={<AddProduct />}
            />

            <Route
              path="/products/:id"
              element={<ProductInfo />}
            />

            <Route
              path="/products/:id/edit"
              element={<UpdateProduct />}
            />

            <Route
              path="*"
              element={<h2>페이지를 찾을 수 없습니다.</h2>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

