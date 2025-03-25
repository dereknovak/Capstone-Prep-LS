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
}

export type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;