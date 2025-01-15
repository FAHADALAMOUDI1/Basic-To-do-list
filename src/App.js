import './App.css';
import { useRef, useState, useEffect } from 'react';

function App() {
  // Load todos from local storage when the component mounts
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const inputRef = useRef();

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const text = inputRef.current.value.trim();
    if (text === "") {
      alert("Please enter a task!"); // Prevent adding empty todos
      return;
    }
    const newItem = { completed: false, text };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
        <ul>
          {todos.map(({ text, completed }, index) => {
            return (
              <div className="item" key={index}>
                <li
                  className={completed ? "done" : ""}
                  onClick={() => handleItemDone(index)}
                >
                  {text}
                </li>
                <span
                  className="delete"
                  onClick={() => handleDeleteItem(index)}
                >
                  ❌
                </span>
              </div>
            );
          })}
        </ul>
        <input
          className="search"
          ref={inputRef}
          placeholder="Enter a new task..."
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAddTodo(); // Allow adding tasks by pressing Enter
          }}
        />
        <button onClick={handleAddTodo}>Add Task</button>
      </div>
    </div>
  );
}

export default App;