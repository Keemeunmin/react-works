import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FetchTodos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터 요청 실패");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        console.log(result);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류: {error}</p>;

  return (
    <div className="fetch-todos">
      <h2>할 일(To-do) 데이터</h2>
      <p>총 {data.length}건</p>

      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            <Link to={`/${todo.id}`}>
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchTodos;