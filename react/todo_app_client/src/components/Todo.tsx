import type { Todo, TodoListTools } from "../types";

const Todo: React.FC<TodoListTools> = ({ todos, setTodos, todo, setTodo }) => {
  const { id, title, day, month, year, completed, description } = todo;

  const formatDate = () => (!month || !year) ? 'No Due Date' : `${month}/${year}`;
  const fullDate = formatDate();

  const toggleComplete = () => {
    const newStatus = !completed;
    const todosCopy = todos.slice();

    todosCopy.map(todo => {
      if (todo.id === id) {
        todo.completed = newStatus;
      }

      return todo;
    });

    todosCopy.sort((a, b) => a.id - b.id);
    todosCopy.sort((a, b) => Number(a.completed) - Number(b.completed));

    setTodos(todosCopy);
  };

  return (
    <tr onClick={toggleComplete}>
      <td className='list_item'>
        <input type='checkbox' checked={completed} />
        <span className='check'></span>
        <label>{title} - {fullDate}</label>
      </td>
      <td className='delete'>
        <img src='src/assets/images/trash.png' alt='Delete' />
      </td>
    </tr>
  );
};

export default Todo;

// Checkbox vanishes when clicked