import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

import Main from './components/Main';
import Nav from './components/Nav';

import { sortList, emptyTodo } from './utilities/shared';
import type { Tab, Todo } from './types';

const baseURL = 'http://localhost:3000/api';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState<Tab>('All Todos');
  const [todo, setTodo] = useState<Todo>(emptyTodo);

  const fetchTodos = async () => {
    const response = await axios.get(`${baseURL}/todos`);
    const retrievedTodos = response.data;
    sortList(retrievedTodos);

    setTodos(retrievedTodos);
  }

  useEffect(() => {
    fetchTodos()
  }, []);

  return (
    <>
      <input type='checkbox' id='sidebar_toggle' />
      <Nav todos={todos}
           setTab={setTab} />
      <Main todos={todos}
             setTodos={setTodos}
             todo={todo}
             setTodo={setTodo}
             tab={tab}
             setTab={setTab} />
    </>
  )
};

export default App
