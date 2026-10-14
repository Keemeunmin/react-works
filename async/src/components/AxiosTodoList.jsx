import { useState, useEffect } from "react";
import axios from "axios";

function AxiosTodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );

        setTodos(response.data.slice(0, 10));
      } catch (err) {
        setError("데이터를 가져오지 못했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  if (loading) return <p>데이터를 불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Axios로 가져온 할 일 목록</h2>

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

export default AxiosTodoList;