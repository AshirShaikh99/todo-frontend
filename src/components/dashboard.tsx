'use client'

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2, Plus, Pencil } from 'lucide-react';
import { useTodo } from "@/context/todo-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Checkbox } from "@/components/ui/checkbox";

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  status: "todo" | "inProgress" | "done";
}

export function Dashboard() {
  const { toast } = useToast();
  const { todos, createTodo, updateTodo, deleteTodo, fetchTodos } = useTodo();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  

  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id' | 'completed' | 'status'>>({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (userId) {
      fetchTodos(userId);
    }
  }, [fetchTodos, userId]);

  async function handleCreateTodo() {
    try {
      if (newTodo.title.trim()) {
        await createTodo({
          ...newTodo,
          status: "todo",
          completed: false,
        });

        if (userId) {
          fetchTodos(userId);
        }

        setNewTodo({ title: "", description: "", dueDate: "" });
        setIsCreateDialogOpen(false);
        toast({
          title: "Success",
          description: "Todo created successfully",
        });
      }
    } catch (error) {
      console.error("Failed to create todo:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create todo",
      });
    }
  }

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTodo = async () => {
    if (editingTodo) {
      try {
        console.log("UPDATING TODO", editingTodo.id, editingTodo);
        await updateTodo(editingTodo.id, editingTodo);
        setIsEditDialogOpen(false);
        if (userId) {
          fetchTodos(userId);
        }
        toast({
          title: "Success",
          description: "Todo updated successfully",
        });
      } catch (error) {
        console.error("Failed to update todo:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update todo",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex items-center justify-center fixed inset-0">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="sticky top-0 z-10 bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/75 p-6">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Tasks</h1>
          <div className="flex justify-center">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
                  <Plus className="h-5 w-5 mr-2" />
                  New task
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">Create New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Task title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Textarea
                    placeholder="Task description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Input
                    type="date"
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Button onClick={handleCreateTodo} className="w-full">
                    Create Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`bg-gray-700 p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                todo.completed ? 'border-green-500' : 'border-gray-600 hover:border-blue-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${
                    todo.completed ? 'text-gray-400 line-through' : 'text-white'
                  }`}>
                    {todo.title}
                  </h3>
                  <p className={`mt-2 ${
                    todo.completed ? 'text-gray-500' : 'text-gray-300'
                  }`}>
                    {todo.description}
                  </p>
                  {todo.dueDate && (
                    <p className="text-blue-400 text-sm mt-3">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                  )}
                  <p className={`text-sm mt-2 ${
                    todo.completed ? 'text-green-400' :
                    todo.status === 'todo' ? 'text-yellow-400' :
                    todo.status === 'inProgress' ? 'text-blue-400' :
                    'text-green-400'
                  }`}>
                    Status: {todo.completed ? 'Completed' : todo.status}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTodo(todo)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Edit Task</DialogTitle>
          </DialogHeader>
          {editingTodo && (
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Task title"
                value={editingTodo.title}
                onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
              />
              <Textarea
                placeholder="Task description"
                value={editingTodo.description}
                onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                className="bg-gray-700 text-white border-gray-600"
              />
              
              
                <div className="flex items-center space-x-2">
                <Checkbox
                  id="completed"
                  checked={editingTodo.completed}
                  onCheckedChange={(checked) => 
                  setEditingTodo({ ...editingTodo, completed: checked === true })
                  }
                  className="bg-gray-700 text-white border-gray-600"
                />
                <label
                  htmlFor="completed"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Completed
                </label>
                </div>
              <Button onClick={handleUpdateTodo} className="w-full">
                Update Task
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

