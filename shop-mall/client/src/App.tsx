
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './layouts/Header';

import UserProvider from './context/UserProvider';
import ProductProvider from './context/ProductProvider';
import CartProvider from './context/CartProvider';

import ProductList from './products/ProductList';
import ProductDetail from './products/ProductDetail';
import AddProduct from './products/AddProduct';
import Cart from './products/Cart';

import SignIn from './users/SignIn';
import SignUp from './users/SignUp';

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />

            <main>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/new" element={<AddProduct />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </main>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
