import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './layouts/Header'
import Main from './layouts/Main'
import ProductList from './pages/ProductList'
import ProductInfo from './pages/ProductInfo'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
