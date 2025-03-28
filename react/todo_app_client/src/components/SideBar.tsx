import { formatDate } from "../utilities/shared";
import type { Todo, TodoList, TodoListTools } from "../types";

const SideBar: React.FC<TodoListTools> = ({ todos, group, setGroup }) => {
  const groupByDate = () => {
    const groups: {[date: string]: Todo[]} = {};

    todos.forEach(todo => {
      const date = formatDate(todo.month, todo.year);
      if (groups[date]) {
        groups[date].push(todo);
      } else {
        groups[date] = [todo];
      }
    });

    return groups;
  };

  // Change to keyof
  const loadGroup = (currentTarget: React.MouseEvent, name: string) => {
    setGroup(name);

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.remove('active');
    currentTarget.classList.add('active');
  };

  const loadAllTodos = () => {
    setGroup('');

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.add('active');
  };

  return (
    <div id='sidebar'>
      <section id='all'>
        <div id='all_todos'>
          <header id='all_header' className='active' onClick={loadAllTodos}>
            <dl>
              <dt>All Todos</dt>
              <dd>{todos.length}</dd>
            </dl>
          </header>
        </div>
        <article id='all_lists'>
          {
            Object.entries(groupByDate()).map(([name, contents], idx) =>
              <dl key={idx} onClick={(e) => loadGroup(e.currentTarget, name)}>
                <dt>{name}</dt>
                <dd>{contents.length}</dd>
              </dl>
            )
          } 
        </article>
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

export default SideBar;