import { useState } from "react";
import axios from "axios";

function AxiosNewTodo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("할 일을 입력하세요.");
      return;
    } 

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: title.trim(),
          completed: false,
          userId: 1,
        }
      );

      const newTodo = {
        ...response.data,
        id: Date.now(),
      };

      setTodos((prev) => [...prev, newTodo]);
      setTitle("");

      alert("할 일이 추가되었습니다!");
    } catch (error) {
      console.error(error);
      setError("할 일을 추가하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };

  return (
    <div className="axios-new-todo">
      <h2>할 일 추가</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "추가 중..." : "추가"}
        </button>
      </form>

      {error && <p>{error}</p>}

      <h3>내가 추가한 할 일</h3>

      {todos.length === 0 ? (
        <p>아직 추가한 할 일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>

              <button
                type="button"
                onClick={() => handleDelete(todo.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AxiosNewTodo;