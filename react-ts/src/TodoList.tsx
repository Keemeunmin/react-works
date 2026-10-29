import type { Todo } from "./Todos";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
};

const TodoList = ({ todos, toggleTodo }: TodoListProps) => {
  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed
                ? "line-through"
                : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;