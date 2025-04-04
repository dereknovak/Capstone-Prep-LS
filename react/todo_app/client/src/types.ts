export interface Todo {
  id: number;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  completed?: boolean;
  description?: string;
}

export type TodoList = Todo[];
export type Date = `${number}${number}/${number}${number}${number}${number}` | 'No Due Date';
export type CompletedDate = `${Date} (Completed)`;
export type Tab = Date | CompletedDate | 'No Due Date' | 'All Todos' | 'Completed';

export interface AppTools {
  todos: TodoList;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
}

export type MainTools = Omit<AppTools, 'checked' | 'setChecked'>;
export type ListTools = Omit<AppTools, 'todo'>;
export type TodoTools = Omit<AppTools, 'tab' | 'setTab'>;
export type ModalTools = AppTools;
export type NavTools = Pick<AppTools, 'todos' | 'setTab'>;

export interface TabProps {
  name: string;
  contents: TodoList;
  loadGroup: (currentTarget: HTMLDListElement, name: Tab, listType: "all" | "completed") => void;
  listType: 'all' | 'completed';
}

export type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type Group = [string, TodoList];