import { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );

        if (!response.ok) {
          throw new Error("데이터 요청 실패");
        }

        const data = await response.json();
        setTodos(data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  if (loading) return <p>데이터를 불러오는 중...</p>;
  if (error) return <p>오류: {error}</p>;

  return (
    <div>
      <h2>할 일 목록</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            {todo.completed ? " (완료)" : " (미완료)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;