import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import FetchTodos from "./fetch_ex/FetchTodos";
import FetchTodoById from "./fetch_ex/FetchTodoById";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>React 비동기 처리 실습</h1>

        <Routes>
          <Route path="/" element={<FetchTodos />} />
          <Route path="/:id" element={<FetchTodoById />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;