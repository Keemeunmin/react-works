
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { totalQuantity } = useCart();
  const { currentUser, signOut } = useUser();

  return (
    <div className="header">
      <h1><Link to="/">SPACE SHOP</Link></h1>

      <nav>
        <Link to="/">상품 목록</Link>
        <Link to="/product/new">상품 등록</Link>
        <Link to="/cart">장바구니 ({totalQuantity})</Link>

        {currentUser ? (
          <>
            <span>{currentUser.name}님</span>
            <button type="button" onClick={signOut}>
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/signin">로그인</Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
