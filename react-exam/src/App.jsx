import { Routes, Route } from 'react-router-dom'
import Header from './layouts/Header'
import ProductList from './pages/ProductList'
import Notice from './pages/Notice'
import LikeButton from './components/LikeButton'
import LiveInput from './components/LiveInput'
import Page from './components/Page'
import './App.css'

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/notice" element={<Notice />} />
        </Routes>

        <h2>HOOK 실습</h2>
        <LikeButton />
        <LiveInput />
        <Page />
      </main>
    </>
  )
}

export default App