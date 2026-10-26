import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addTodo,
  toggleTodo,
  deleteTodo,
} from "./redux/todoSlice";

const ReduxTodo = () => {
  const [text, setText] = useState("");

  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  // 할 일 추가
  const handleAdd = () => {
    if (text.trim() === "") {
      alert("할 일을 입력하세요.");
      return;
    }

    dispatch(addTodo(text.trim()));
    setText("");
  };

  return (
    <div>
      <h2>Redux Toolkit To-do List</h2>

      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />

      <button onClick={handleAdd}>추가</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />

            <span
              style={{
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
                margin: "0 10px",
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReduxTodo;