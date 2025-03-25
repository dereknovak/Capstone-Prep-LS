import { ChangeEvent, useState } from "react";
import type { Todo, TodoListTools } from "../types";
import { openModal } from "../utilities/shared";

const Todo: React.FC<TodoListTools> = ({ todos, setTodos, todo, setTodo }) => {
  const [checked, setChecked] = useState(false);
  const { id, title, day, month, year, completed, description } = todo;

  const formatDate = () => (!month || !year) ? 'No Due Date' : `${month}/${year}`;
  const fullDate = formatDate();

  const toggleComplete = () => {
    const newStatus = !completed;
    const todosCopy = todos.map(todo => 
      todo.id === id ? { ...todo, completed: newStatus } : todo
    );

    todosCopy.sort((a, b) => a.id - b.id);
    todosCopy.sort((a, b) => Number(a.completed) - Number(b.completed));

    setChecked(checked);
    setTodos(todosCopy);
  };
  
  //Look more into this
  const handeCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const reviseTodo = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation();

    openModal();
    setTodo(todo);
  };

  return (
    <tr onClick={toggleComplete}>
      <td className='list_item'>
        <input type='checkbox'
               checked={completed}
               onChange={handeCheckboxChange} />
        <span className='check'></span>
        <label onClick={reviseTodo} >{title} - {fullDate}</label>
      </td>
      <td className='delete'>
        <img src='src/assets/images/trash.png' alt='Delete' />
      </td>
    </tr>
  );
};

export default Todo;

// Checkbox vanishes when clicked