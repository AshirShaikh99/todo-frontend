import { useState } from "react";
import { TodoContext } from "../context/todo-context";
import { Todo, TodoContextType } from "../context/todo-types";
import axios from "axios";
import api from "@/services/api";

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/todos?id=${userId}`
      );
      setTodos(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  };

  const createTodo = async (todo: Omit<Todo, "id">) => {
    setIsLoading(true);
    try {
      const response = await api.post("/todos", todo);
      console.log("WE HAVE CREATED A TODO", response.data);
      setTodos((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError("Failed to create todo");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id: string, todo: Partial<Todo>) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/v1/todos/${id}`, todo);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...todo } : t))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update todo");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/v1/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete todo");
    } finally {
      setIsLoading(false);
    }
  };

  const value: TodoContextType = {
    todos,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    fetchTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}