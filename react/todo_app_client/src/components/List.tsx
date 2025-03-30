import type { TodoListTools } from "../types";
import { deactivateAllTabs, emptyTodo, formatDate, openModal } from "../utilities/shared";
import Todo from "./Todo";

const List: React.FC<Omit<TodoListTools, 'todo'>> = ({ todos, setTodos, setTodo, checked, setChecked, group, setGroup }) => {
  const addNewTodo = () => {
    openModal();
    setTodo(emptyTodo);
    loadAllTodos();
  };

  const loadAllTodos = () => {
    setGroup('All Todos');
    deactivateAllTabs();

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.add('active');
  };

  const currentGroup = () => {
    if (group === 'All Todos') {
      return todos;
    } else if (group === 'Completed') {
      return todos.filter(todo => todo.completed);
    } else if (group.includes('Completed')) {
      return todos.filter(todo => {
        const groupDate = group.replace(/ \(Completed\)/, '');
        return formatDate(todo.month, todo.year) === groupDate;
      }).filter(todo => todo.completed);
    } else {
      return todos.filter(todo => {
        return formatDate(todo.month, todo.year) === group;
      });
    }
  };

  return (
    <>
      <header>
        <dl>
          <dt>{group}</dt>
          <dd>{currentGroup().length}</dd>
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

/* 
Should have finished all functionality
Need to go through and check edge cases
Validation?
Fix all TS errors
Refactor Code
Change on API?
*/

