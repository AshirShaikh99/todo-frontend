// src/context/todo-types.ts
export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  status: "todo" | "inProgress" | "done";
}

export interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  createTodo: (todo: Omit<Todo, "id">) => Promise<void>;
  updateTodo: (id: string, todo: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  fetchTodos: (userId: string) => Promise<void>;
}
