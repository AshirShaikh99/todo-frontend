// src/store/todoSlice/todoSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "todo" | "inProgress" | "done";
}

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userId: string) => {
    const response = await api.get(`/todos?id=${userId}`);
    return response.data;
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todo: Omit<Todo, "id">) => {
    const response = await api.post("/todos", todo);
    return response.data;
  }
);

export const updateTodoStatus = createAsyncThunk(
  "todos/updateStatus",
  async ({ id, status }: { id: string; status: Todo["status"] }) => {
    const response = await api.put(`/todos/${id}`, { status });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    await api.delete(`/todos/${id}`);
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
      })
      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
