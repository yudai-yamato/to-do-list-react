import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Stack,
  Box
} from '@mui/material'
import './App.css';

type Todo = {
  id:number
  text:string
  deadline:string
  done:boolean
}

function App() {
  const [task, setTask] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<string>("");

  const handleAddOrUpdate = () => {
    if (task.trim() === '') return;

    if (editingId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: task, deadline: deadline } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
    }
    else {
      setTodos([...todos, { id: Date.now(), text: task, deadline: deadline, done: false }]);

    }
    setTask('');
    setDeadline('');
  };


  const handleEdit = (id:number) => {
    const targetTodo = todos.find((todo) => todo.id === id);
    if (targetTodo) {
      setTask(targetTodo.text);
      setDeadline(targetTodo.deadline);
      setEditingId(id);
    }
  };

  const handleDelete = (id:number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);

    if (editingId === id) {
      setEditingId(null);
      setTask('');
      setDeadline('');
    };
  };

  const handleToggleDone = (id:number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo);
    setTodos(updatedTodos);
  };

  return (
    <Box sx={{
      maxWidth: 500, mx: 'auto', mt: 10, px: 4,
      py: 4, backgroundColor: 'white',
      borderRadius: 6, boxShadow: 6,
      minHeight:400,display:'flex',flexDirection:'column',
      justifyContent:'space-between'
    }}>
      <Typography variant="h4" gutterBottom>To Do List</Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="タスク"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          fullwidth
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddOrUpdate();
          }}
        />
        <TextField
          type="date"
          label="期限"
          InputLabelProps={{ shrink: true }}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </Stack>
      <Button variant="contained" onClick={handleAddOrUpdate} fullWidth sx={{ mb: 3 }}>
        {editingId !== null ? '保存' : '追加'}
      </Button>

      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" size="small" onClick={() => handleEdit(todo.id)}>
                  編集
                </Button>
                <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(todo.id)}>
                  削除
                </Button>
              </Stack>
            }
          >
            <Checkbox
              checked={todo.done}
              onChange={() => handleToggleDone(todo.id)}
            />
            <ListItemText
              primary={
                <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
              }
              secondary={`期限: ${todo.deadline}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default App;







//   <div className="app">
//     <h1>To-Do List</h1>
//     <input
//       value={task}
//       onChange={(e) => setTask(e.target.value)}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter') {
//           handleAddOrUpdate();
//         }
//       }}
//       placeholder="タスクを入力" />

//     <input type="date"
//       value={deadline}
//       onChange={(e) => setDeadline(e.target.value)}
//     />

//     <button onClick={handleAddOrUpdate}>
//       {editingId !== null ? '保存' : '追加'}
//     </button>
//     <ul>
//       {todos.map((todo) => (
//         <li key={todo.id}>
//           <input type="checkbox"
//             checked={todo.done}
//             onChange={() => handleToggleDone(todo.id)}
//           />
//           <span style={{ textDecoration: todo.done ? 'line-through' : 'none', }}>
//             {todo.text} (期限:{todo.deadline})
//           </span>


//           <button onClick={() => handleEdit(todo.id)}>編集</button>
//           <button onClick={() => handleDelete(todo.id)}>削除</button>
//         </li>
//       ))}
//     </ul>
//   </div>
//   );
// }
// export default App;


