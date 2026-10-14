import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function FetchTodoById() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError("");

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터 요청 실패");
        }
        return response.json();
      })
      .then((result) => {
        if (!result.id) {
          throw new Error("해당 할 일을 찾을 수 없습니다.");
        }
        setData(result);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류: {error}</p>;

  return (
    <div className="fetch-todo-by-id">
      <h2>할 일 상세 정보</h2>

      {data && (
        <div>
          <p><strong>번호:</strong> {data.id}</p>
          <p><strong>제목:</strong> {data.title}</p>
          <p>
            <strong>완료 여부:</strong>{" "}
            {data.completed ? "● 완료" : "○ 미완료"}
          </p>
        </div>
      )}

      <Link to="/">← 목록으로 돌아가기</Link>
    </div>
  );
}

export default FetchTodoById;