import { UserContext } from "./UserContext";
import UserChild from "./UserChild";

const UserParent = () => {
  const user = {
    name: "오상식",
    age: 45
  };

  return (
    <div className="user-parent">
      <h2>UserParent 컴포넌트입니다.</h2>

      <UserContext.Provider value={user}>
        <UserChild />
      </UserContext.Provider>
    </div>
  );
};

export default UserParent;