import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

import Modal from './components/Modal';
import List from './components/List';
import { emptyTodo } from './utilities/shared';
import type { Todo, TodoList, TodoListTools } from './types';

const baseURL = 'http://localhost:3000/api';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
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
      <SideBar todos={todos} />
      <Items todos={todos}
             setTodos={setTodos}
             todo={todo}
             setTodo={setTodo} />
    </>
  )
};

const SideBar: React.FC<{ todos: TodoList }> = ({ todos }) => {
  return (
    <div id='sidebar'>
      <section id='all'>
        <div id='all_todos'>
          <header id='all_header' className='active'>
            <dl>
              <dt>All Todos</dt>
              <dd>{todos.length}</dd>
            </dl>
          </header>
        </div>
        <article id='all_lists'></article>
      </section>
      <section className='completed' id='completed_items'>
        <div id='completed_todos'>
          <header id='all_done_header'>
            <dl>
              <dt>Completed</dt>
              <dd>0</dd>
            </dl>
          </header>
        </div>
      </section>
    </div>
  );
};

const Items: React.FC<TodoListTools> = ({ todos, setTodos, todo, setTodo }) => {
  return (
    <div id='items'>
      <main>
        <Modal todos={todos}
               setTodos={setTodos}
               todo={todo}
               setTodo={setTodo} />
        <List todos={todos}
              setTodos={setTodos}
              todo={todo}
              setTodo={setTodo} />
      </main>
    </div>
  );
}

export default App
