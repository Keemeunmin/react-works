import Counter from "./Counter";
import InputFocus from "./InputFocus";
import CountReducer from "./CountReducer";
import BankReducer from "./BankReducer";
import UserParent from "./UserParent";

import { LoginProvider } from "./LoginContext";
import LoginStatus from "./LoginStatus";

import ReduxCounter from "./ReduxCounter";
import ReduxBank from "./ReduxBank";
import ReduxTodo from "./ReduxTodo";

function App() {
  return (
    <div>
      {/* <h1>React 심화 실습</h1>

      <h2>1. useRef</h2>
      <Counter />

      <hr />

      <InputFocus />

      <hr />

      <h2>2. useReducer</h2>
      <CountReducer />

      <hr />

      <h2>3. BankReducer</h2>
      <BankReducer />

      <hr />

      <h2>4. useContext</h2>
      <UserParent />

      <hr />

      <h2>5. 로그인 Context</h2>
      <LoginProvider>
        <LoginStatus />
      </LoginProvider>

      <hr />

      <h2>6. Redux Toolkit 카운터</h2>
      <ReduxCounter />

      <hr /> */}

      {/* <h2>7. Redux Toolkit 은행</h2>
      <ReduxBank />

      <hr /> */}
      
      <h2>8. Redux Toolkit To-do List</h2>
      <ReduxTodo />

    </div>
  );
}

export default App;