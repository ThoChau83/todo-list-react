import { useState } from "react";

export default function App() {
  const [todo, setTodo] = useState([]);

  //state for search
  const [search, setSearch] = useState("");

  //logic add
  function handleAdd(value) {
    const newTodo = {
      id: Date.now(),
      text: value,
      completed: false,
    };
    setTodo([...todo, newTodo]);
  }

  //logic delete
  function handleDelete(value) {
    const x = todo.filter((todo) => todo.id !== value);
    setTodo(x);
  }

  //logic completed
  function handleToggle(value) {
    const y = todo.map((item) =>
      item.id === value ? { ...item, completed: !item.completed } : item,
    );
    setTodo(y);
  }

  //login filter search
  function handleFilter(value) {
    setSearch(value);
  }
  const valueSearch = todo.filter((i) =>
    i.text.toLowerCase().includes(search.toLowerCase()),
  );

  //logic tinh so luong todo
  const numTodo = todo.filter((i) => i.completed === true).length;
  const totolTodo = todo.length;

  //return
  return (
    <div className="App">
      <TodoInput onHandleAdd={handleAdd} />
      <TodoList
        todo={valueSearch}
        onHandleDelete={handleDelete}
        onHandleToggle={handleToggle}
      />
      <TodoStatus
        onHandleFilter={handleFilter}
        numTodo={numTodo}
        totolTodo={totolTodo}
      />
    </div>
  );
}

function TodoInput({ onHandleAdd }) {
  const [todoInput, setTodoInput] = useState("");
  function handleSubmit() {
    onHandleAdd(todoInput);
    setTodoInput("");
  }

  return (
    <div className="todo-input">
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
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
      <span>{todo.text}</span>
      <button onClick={() => onHandleDelete(todo.id)}>X</button>
    </li>
  );
}

function TodoStatus({ onHandleFilter, totolTodo, numTodo }) {
  const [query, setQuery] = useState("");
  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    onHandleFilter(value);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="filter"
        value={query}
        onChange={handleChange}
      />
      <p>
        {totolTodo > 0
          ? `Bạn đẫ hoàn thành ${numTodo} / ${totolTodo}`
          : "Thêm todo dô đi nè"}{" "}
      </p>
    </div>
  );
}
