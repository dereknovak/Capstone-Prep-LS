import { deactivateAllTabs, formatDate } from "../utilities/shared";
import type { Date, Group, NavTools, Tab as TabType, Todo } from "../types";

import Tab from "./Tab";

const Nav: React.FC<NavTools> = ({ todos, setTab }) => {
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

    return sortGroups(Object.entries(groups));
  };

  const sortGroups = (groups: Group[]) => {
    const noDueDate = groups.filter(([name]) => name === 'No Due Date');
    const dates = groups.filter(([name]) => name !== 'No Due Date');

    dates.sort((a: Group, b: Group) => {
      const dateA = new Date(Number(a[0].slice(3)), Number(a[0].slice(0, 2)) - 1);
      const dateB = new Date(Number(b[0].slice(3)), Number(b[0].slice(0, 2)) - 1);

      return dateA.getTime() - dateB.getTime();
    });

    return noDueDate.concat(dates);
  };

  const isDate = (name: TabType): name is Date => {
    return !name.includes(' (Completed)');
  };

  const loadGroup = (currentTarget: HTMLDListElement, name: TabType, listType: 'all' | 'completed') => {
    if (listType === 'completed') {
      console.log(`${name} (Completed)`);
      if (isDate(name)) setTab(`${name} (Completed)`);
    } else {
      setTab(name);
    }

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.remove('active');

    deactivateAllTabs();

    currentTarget.classList.add('active');
  };

  const loadAllTodos = () => {
    setTab('All Todos');
    deactivateAllTabs();

    const allTodosHeader = document.getElementById('all_header') as HTMLElement;
    allTodosHeader.classList.add('active');
  };

  const loadAllCompleted = () => {
    setTab('Completed');
    deactivateAllTabs();

    const allDoneHeader = document.getElementById('all_done_header') as HTMLElement;
    allDoneHeader.classList.add('active');
  };

  const completedTodos = () => {
    return todos.filter(todo => todo.completed);
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
            groupByDate().map(([name, contents], idx) =>
              <Tab key={idx}
                   name={name}
                   contents={contents}
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
            groupByDate(true).map(([name, contents], idx) =>
              <Tab key={idx}
                   name={name}
                   contents={contents}
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

export default Nav;