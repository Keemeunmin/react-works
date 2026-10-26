import { useContext } from "react";
import { UserContext } from "./UserContext";

const UserGrandChild = () => {
  // Context에서 공유된 user 데이터를 가져옴
  const user = useContext(UserContext);

  return (
    <div className="user-grandchild">
      <h2>UserGrandChild 컴포넌트입니다.</h2>

      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
    </div>
  );
};

export default UserGrandChild;