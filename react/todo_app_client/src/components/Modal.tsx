import { ChangeEvent } from 'react';
import type { FormElement, Todo, TodoListTools } from '../types';
import { closeModal, emptyTodo } from '../utilities/shared';

const Modal: React.FC<TodoListTools> = ({ todos, setTodos, todo, setTodo }) => {
  const addToList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos(todos.concat({
      ...todo,
      id: generateId(),
    }));

    setTodo(emptyTodo);
    closeModal();
  };

  const updateText = (e: ChangeEvent<FormElement>) => {
    const target = e.target as FormElement;

    setTodo({
      ...todo,
      [target.name]: target.value,
    });
  }

  const generateId = () => {
    return Math.max(...todos.map((todo: Todo) => todo.id)) + 1 || 0
  };

  const handleCompleteButton = () => {
    // Working on implementing a way to check if Modal form is new for Complete button
  };

  return (
    <>
      <div className='modal'
           id='modal_layer'
           onClick={closeModal}></div>
      <div className='modal' id='form_modal'>
        <form action='' method='POST' onSubmit={addToList}>
          <fieldset>
            <ul>
              <li>
                <label>Title</label>
                <input type='text'
                       id='title'
                       name='title'
                       placeholder='Item 1'
                       value={todo.title}
                       onChange={updateText} />
              </li>
              <li>
                <label>Due Date</label>
                <div className='date'>
                  <select id='due_day'
                          name='day'
                          value={todo.day}
                          onChange={updateText}>
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
                  <select id='due_month'
                          name='month'
                          value={todo.month}
                          onChange={updateText}>
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
                  <select id='due_year'
                          name='year'
                          value={todo.year}
                          onChange={updateText}>
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
                <textarea cols={50} name='description' rows={7} placeholder='Description' value={todo.description} onChange={updateText}></textarea>
              </li>
              <li>
                <input type='submit' value='Save' />
                <button name='complete'
                        onClick={handleCompleteButton}>Mark as Complete</button>
              </li>
            </ul>  
          </fieldset>  
        </form>
      </div>
    </>
  );
};

export default Modal;