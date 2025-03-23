import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

interface Todo {
  id: number;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  completed?: boolean;
  description?: string;
}

interface TodoList {
  todos: Todo[];
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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
      <Items todos={todos} />
    </>
  )
};

const SideBar: React.FC<TodoList> = ({ todos }) => {
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

const Items: React.FC<TodoList> = ({ todos }) => {
  return (
    <div id='items'>
      <main>
        <TodoList todos={todos} />
        <Modal />
      </main>
    </div>
  );
}

const Modal = () => {
  const closeModal = () => {
    const modalForm = document.getElementById('form_modal');
    const modalLayer = document.getElementById('modal_layer');

    modalForm.style.display = 'none';
    modalLayer.style.display = 'none';
  };

  return (
    <>
      <div className='modal'
           id='modal_layer'
           onClick={closeModal}></div>
      <div className='modal' id='form_modal'>
        <form action='' method='POST'>
          <fieldset>
            <ul>
              <li>
                <label>Title</label>
                <input type='text' id='title' placeholder='Item 1' />
              </li>
              <li>
                <label>Due Date</label>
                <div className='date'>
                  <select id='due_day' name='due_day'>
                    <option>Day</option>
                    <option value='01'>1</option>
                    <option value='02'>2</option>
                    <option value='03'>3</option>
                    <option value='04'>4</option>
                    <option value='05'>5</option>
                    <option value='06'>6</option>
                    <option value='07'>7</option>
                    <option value='08'>8</option>
                    <option value='09'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                    <option value='24'>24</option>
                    <option value='25'>25</option>
                    <option value='26'>26</option>
                    <option value='27'>27</option>
                    <option value='28'>28</option>
                    <option value='29'>29</option>
                    <option value='30'>30</option>
                    <option value='31'>31</option>
                  </select>
                  <select id='due_month' name='due_month'>
                    <option>Month</option>
                    <option value='01'>January</option>
                    <option value='02'>February</option>
                    <option value='03'>March</option>
                    <option value='04'>April</option>
                    <option value='05'>May</option>
                    <option value='06'>June</option>
                    <option value='07'>July</option>
                    <option value='08'>August</option>
                    <option value='09'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                  </select>
                  <select id='due_year' name='due_year'>
                    <option>Year</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                  </select>
                </div>
              </li>
              <li>
                <label>Description</label>
                <textarea cols={50} name='description' rows={7} placeholder='Description'></textarea>
              </li>
              <li>
                <input type='submit' value='Save' />
                <button name='complete'>Mark as Complete</button>
              </li>
            </ul>  
          </fieldset>  
        </form>
      </div>
    </>
  );
};

const TodoList: React.FC<TodoList> = ({ todos }) => {
  const openModal = () => {
    const modalForm = document.getElementById('form_modal');
    const modalLayer = document.getElementById('modal_layer');

    modalForm.style.display = 'block';
    modalLayer.style.display = 'block';
  };

  return (
    <>
      <header>
        <dl>
          <dt>All Todos</dt>
          <dd>{todos.length}</dd>
        </dl>
      </header>
      <label onClick={openModal}>
        <img src='src/assets/images/plus.png' alt='Add Todo Item' />
        <h2>Add new Todo</h2>
      </label>
      <table cellSpacing={0}>
        <tbody>
          {
            todos.map((todo, idx) =>
              <Todo key={idx} todo={todo} />
            )
          }
        </tbody>
      </table>
    </>
  );
};

const Todo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { title, day, month, year, completed, description } = todo;

  const formatDate = () => (!month || !year) ? 'No Due Date' : `${month}/${year}`;
  const fullDate = formatDate();

  return (
    <tr>
      <td className='list_item'>
        <input type='checkbox' />
        <span className='check'></span>
        <label>{title} - {fullDate}</label>
      </td>
      <td className='delete'>
        <img src='src/assets/images/trash.png' alt='Delete' />
      </td>
    </tr>
  );
};

export default App
