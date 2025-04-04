import { ChangeEvent } from "react";
import type { Todo, TodoTools } from "../types";
import { formatDate, openModal } from "../utilities/shared";
import { update, remove } from "../utilities/services";

const Todo: React.FC<TodoTools> = ({ todos, setTodos, todo, setTodo, checked, setChecked }) => {
  const { id, title, month, year, completed } = todo;

  const fullDate = formatDate(month, year);

  const toggleComplete = () => {
    const newStatus = !completed;
    const updatedTodo: Todo = { ...todo, completed: newStatus };

    const todosCopy = todos.map(todo => 
      todo.id === id ? updatedTodo : todo
    );
    
    todosCopy.sort((a, b) => a.id - b.id);
    todosCopy.sort((a, b) => Number(a.completed) - Number(b.completed));
    
    update(todo.id, updatedTodo);
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

  const deleteTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const todosCopy = todos.filter(todoCopy => todo.id !== todoCopy.id);
    remove(todo.id);
    setTodos(todosCopy);
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
      <td className='delete' onClick={deleteTodo}>
        <img src='src/assets/images/trash.png' alt='Delete' />
      </td>
    </tr>
  );
};

export default Todo;
