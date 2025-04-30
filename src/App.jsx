import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deadline, setDeadline] = useState("");

  const handleAddOrUpdate = () => {
    if (task.trim() === '') return;

    if (editingId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: task, deadline:deadline} : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
    }
    else {
      setTodos([...todos, { id: Date.now(), text: task, deadline:deadline }]);

    }
    setTask('');

  };

  const handleEdit = (id) => {
    const targetTodo = todos.find((todo) => todo.id === id);
    if (targetTodo) {
      setTask(targetTodo.text);
      setDeadline(targetTodo.deadline);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);

    if (editingId === id) {
      setEditingId(null);
      setTask('');
    };
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddOrUpdate();
          }
        }}
        placeholder="タスクを入力" />

      <input type="date"
      value={deadline}
      onChange={(e)=>setDeadline(e.target.value)}
      />

      <button onClick={handleAddOrUpdate}>
        {editingId !== null ? '保存' : '追加'}
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>{todo.text}</div>
            <div>{todo.deadline}</div>
            
            
            <button onClick={() => handleEdit(todo.id)}>編集</button>
            <button onClick={() => handleDelete(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;


