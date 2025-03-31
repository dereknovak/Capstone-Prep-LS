import type { ListTools } from "../types";
import { deactivateAllTabs, emptyTodo, formatDate, openModal } from "../utilities/shared";
import Todo from "./Todo";

const List: React.FC<ListTools> = ({ todos, setTodos, setTodo, checked, setChecked, tab, setTab }) => {
  const addNewTodo = () => {
    openModal();
    setTodo(emptyTodo);
    loadAllTodos();
  };

  const loadAllTodos = () => {
    setTab('All Todos');
    deactivateAllTabs();

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.add('active');
  };

  const currentGroup = () => {
    if (tab === 'All Todos') {
      return todos;
    } else if (tab === 'Completed') {
      return todos.filter(todo => todo.completed);
    } else if (tab.includes('Completed')) {
      return todos.filter(todo => {
        const groupDate = tab.replace(/ \(Completed\)/, '');
        return formatDate(todo.month, todo.year) === groupDate;
      }).filter(todo => todo.completed);
    } else {
      return todos.filter(todo => {
        return formatDate(todo.month, todo.year) === tab;
      });
    }
  };

  return (
    <>
      <header>
        <dl>
          <dt>{tab}</dt>
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
