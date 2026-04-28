import { useState } from "react";

export default function App() {
  const [todo, setTodo] = useState([]);
  function handleAdd(value) {
    const newTodo = {
      id: Date.now(),
      text: value,
      completed: false,
    };
    setTodo([...todo, newTodo]);
  }
  function handleDelete(value) {
    const x = todo.filter((todo) => todo.id !== value);
    setTodo(x);
  }
  function handleToggle(value) {
    const y = todo.map((item) =>
      item.id === value ? { ...item, completed: !item.completed } : item,
    );
    setTodo(y);
  }
  return (
    <div className="App">
      <TodoInput onHandleAdd={handleAdd} />
      <TodoList
        todo={todo}
        onHandleDelete={handleDelete}
        onHandleToggle={handleToggle}
      />
    </div>
  );
}

function TodoInput({ onHandleAdd }) {
  const [todoInput, setTodoInput] = useState("");

  return (
    <div className="todo-input">
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button onClick={() => onHandleAdd(todoInput)}>Add</button>
    </div>
  );
}

function TodoList({ todo, onHandleDelete, onHandleToggle }) {
  return (
    <div>
      <ul>
        {todo.map((item) => (
          <TodoItem
            todo={item}
            key={item.id}
            onHandleDelete={onHandleDelete}
            onHandleToggle={onHandleToggle}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onHandleDelete, onHandleToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onHandleToggle(todo.id)}
      />
      ;<span>{todo.text}</span>
      <button onClick={() => onHandleDelete(todo.id)}>X</button>
    </li>
  );
}
