import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import FetchTodos from "./fetch_ex/FetchTodos";
import FetchTodoById from "./fetch_ex/FetchTodoById";

import AxiosTodos from "./axios_ex/AxiosTodos";
import AxiosTodoById from "./axios_ex/AxiosTodoById";
import AxiosNewTodo from "./axios_ex/AxiosNewTodo";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>React 비동기 처리 실습</h1>

        <nav className="app-nav">
          <Link to="/">Fetch 목록</Link>
          <Link to="/axios">Axios 목록</Link>
          <Link to="/axios-post">할 일 추가</Link>
        </nav>

        <Routes>
          <Route path="/" element={<FetchTodos />} />
          <Route path="/:id" element={<FetchTodoById />} />

          <Route path="/axios" element={<AxiosTodos />} />
          <Route path="/axios/:id" element={<AxiosTodoById />} />
          <Route path="/axios-post" element={<AxiosNewTodo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;