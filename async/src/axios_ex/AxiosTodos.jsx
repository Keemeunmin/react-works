import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AxiosTodos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("데이터를 가져오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="axios-todos">
      <h2>Axios 할 일 목록</h2>
      <p>총 {data.length}건</p>

      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            <Link to={`/axios/${todo.id}`}>
              {todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AxiosTodos;