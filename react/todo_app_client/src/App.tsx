import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

import Modal from './components/Modal';
import List from './components/List';
import SideBar from './components/SideBar';

import { emptyTodo } from './utilities/shared';
import type { Todo, TodoListTools } from './types';

const baseURL = 'http://localhost:3000/api';

// Specify group type using keyof
const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [group, setGroup] = useState('');
  const [todo, setTodo] = useState<Todo>(emptyTodo);

  const fetchTodos = async () => {
    const response = await axios.get(`${baseURL}/todos`);
    setTodos(response.data);
  }

  useEffect(() => {
    fetchTodos()
  }, []);

  return (
    <>
      <input type='checkbox' id='sidebar_toggle' />
      <SideBar todos={todos}
               group={group}
               setGroup={setGroup} />
      <Items todos={todos}
             setTodos={setTodos}
             todo={todo}
             setTodo={setTodo}
             group={group}
             setGroup={setGroup} />
    </>
  )
};

const Items: React.FC<Omit<TodoListTools, 'checked' | 'setChecked'>> = ({ todos, setTodos, todo, setTodo, group, setGroup }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div id='items'>
      <main>
        <Modal todos={todos}
               setTodos={setTodos}
               todo={todo}
               setTodo={setTodo}
               checked={checked}
               setChecked={setChecked}
               group={group}
               setGroup={setGroup} />
        <List todos={todos}
              setTodos={setTodos}
              setTodo={setTodo}
              checked={checked}
              setChecked={setChecked}
              group={group}
              setGroup={setGroup}/>
      </main>
    </div>
  );
}

export default App
