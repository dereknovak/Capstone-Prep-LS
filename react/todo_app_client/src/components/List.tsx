import type { TodoListTools } from "../types";
import { emptyTodo, formatDate, openModal } from "../utilities/shared";
import Todo from "./Todo";

const List: React.FC<Omit<TodoListTools, 'todo'>> = ({ todos, setTodos, setTodo, checked, setChecked, group, setGroup }) => {
  const addNewTodo = () => {
    openModal();
    setTodo(emptyTodo);
  };

  const currentGroup = () => {
    if (group) {
      return todos.filter(todo => {
        return formatDate(todo.month, todo.year) === group;
      });
    } else {
      return todos;
    }
  };

  return (
    <>
      <header>
        <dl>
          <dt>{group || 'All Todos'}</dt>
          <dd>{todos.length}</dd>
        </dl>
      </header>
      <label onClick={addNewTodo}>
        <img src='src/assets/images/plus.png' alt='Add Todo Item' />
        <h2>Add new Todo</h2>
      </label>
      <table cellSpacing={0}>
        <tbody>
          {
            currentGroup().map((todo, idx) =>
              <Todo key={idx}
                    todos={todos}
                    setTodos={setTodos}
                    todo={todo}
                    setTodo={setTodo}
                    checked={checked}
                    setChecked={setChecked} />
            )
          }
        </tbody>
      </table>
    </>
  );
};

export default List;