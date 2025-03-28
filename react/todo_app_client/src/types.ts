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

export interface TodoListTools {
  todos: TodoList;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
}

export type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;