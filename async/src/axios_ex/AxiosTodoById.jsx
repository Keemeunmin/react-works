import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function AxiosTodoById() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        if (active) {
          setData(response.data);
          setError("");
          setLoading(false);
        }
      })
      .catch((error) => {
        if (active) {
          console.error(error);
          setError("데이터를 가져오지 못했습니다.");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>데이터가 없습니다.</p>;

  return (
    <div className="axios-todo-by-id">
      <h2>Axios 할 일 상세 정보</h2>

      <p>
        <strong>번호:</strong> {data.id}
      </p>

      <p>
        <strong>제목:</strong> {data.title}
      </p>

      <p>
        <strong>완료 여부:</strong>{" "}
        {data.completed ? "● 완료" : "○ 미완료"}
      </p>

      <Link to="/axios">← 목록으로 돌아가기</Link>
    </div>
  );
}

export default AxiosTodoById;