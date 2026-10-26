import UserGrandChild from "./UserGrandChild";

const UserChild = () => {
  return (
    <div className="user-child">
      <h2>UserChild 컴포넌트입니다.</h2>
      <p>(user 데이터를 전달하지 않음)</p>

      <UserGrandChild />
    </div>
  );
};

export default UserChild;