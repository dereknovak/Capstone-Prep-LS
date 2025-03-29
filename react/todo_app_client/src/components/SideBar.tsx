import { formatDate } from "../utilities/shared";
import type { Todo, TodoList, TodoListTools } from "../types";

import Group from "./Group";

const SideBar: React.FC<TodoListTools> = ({ todos, group, setGroup }) => {
  const groupByDate = (completedList = false) => {
    const groups: {[date: string]: Todo[]} = {};
    const todosCopy = completedList ? completedTodos() : todos;

    todosCopy.forEach(todo => {
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
  const loadGroup = (currentTarget: HTMLDListElement, name: string) => {
    setGroup(name);

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.remove('active');

    deactivateAllTabs();

    currentTarget.classList.add('active');
  };

  const loadAllTodos = () => {
    setGroup('All Todos');
    deactivateAllTabs();

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.add('active');
  };

  const loadAllCompleted = () => {
    setGroup('Completed');
    deactivateAllTabs();

    const allDoneHeader = document.getElementById('all_done_header') as HTMLElement;
    allDoneHeader.classList.add('active');
  };

  const completedTodos = () => {
    return todos.filter(todo => todo.completed);
  };

  const deactivateAllTabs = () => {
    const sidebarGroups = document.querySelectorAll('dl');
    for (const tab of sidebarGroups) {
      tab.classList.remove('active');
    }

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.remove('active');

    const allDoneHeader = document.getElementById('all_done_header') as HTMLElement;
    allDoneHeader.classList.remove('active');
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
              <Group key={idx}
                     name={name}
                     contents={contents}
                     group={group}
                     loadGroup={loadGroup}
                     listType={'all'}
              />
            )
          } 
        </article>
      </section>

      <section className='completed' id='completed_items'>
        <div id='completed_todos'>
          <header id='all_done_header' onClick={loadAllCompleted}>
            <dl>
              <dt>Completed</dt>
              <dd>{completedTodos().length}</dd>
            </dl>
          </header>
        </div>
        <article id='completed_lists'>
          {
            Object.entries(groupByDate(true)).map(([name, contents], idx) =>
              <Group key={idx}
                     name={name}
                     contents={contents}
                     group={group}
                     loadGroup={loadGroup}
                     listType={'completed'}
              />
            )
          }
        </article>
      </section>
    </div>
  );
};

export default SideBar;