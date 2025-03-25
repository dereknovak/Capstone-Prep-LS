import type { TodoListTools } from "../types";
import { emptyTodo, openModal } from "../utilities/shared";
import Todo from "./Todo";

const List: React.FC<TodoListTools> = ({ todos, setTodos, todo, setTodo }) => {
  const addNewTodo = () => {
    openModal();
    setTodo(emptyTodo);
  };

  return (
    <>
      <header>
        <dl>
          <dt>All Todos</dt>
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
            todos.map((todo, idx) =>
              <Todo key={idx}
                    todos={todos}
                    setTodos={setTodos}
                    todo={todo}
                    setTodo={setTodo} />
            )
          }
        </tbody>
      </table>
    </>
  );
};

export default List;