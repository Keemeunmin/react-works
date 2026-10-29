import { useState } from "react";
import TodoList from "./TodoList";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "리액트 공부하기", completed: false },
    { id: 2, text: "타입스크립트 배우기", completed: false },
  ]);

  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (!inputValue.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue,
        completed: false,
      },
    ]);

    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h2>To-do List</h2>

      <input
        type="text"
        placeholder="할 일을 입력하세요."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={addTodo}>추가</button>

      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
};

export default Todos;