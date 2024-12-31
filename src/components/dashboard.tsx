import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Pencil, Trash2, Plus } from "lucide-react";
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

export function Dashboard() {
  const { toast } = useToast();
  const { todos, createTodo, updateTodo, deleteTodo, fetchTodos } = useTodo();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({
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
        setIsDialogOpen(false);
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

  return (
    <div className="min-h-screen bg-[#020817] p-4 flex items-center justify-center">
      <div className="max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Tasks</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Task title"
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Task description"
                  value={newTodo.description}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, description: e.target.value })
                  }
                />
                <Input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, dueDate: e.target.value })
                  }
                />
                <Button onClick={handleCreateTodo} className="w-full">
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white/5 p-4 rounded-lg border border-white/10"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">{todo.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {todo.description}
                  </p>
                  {todo.dueDate && (
                    <p className="text-gray-500 text-xs mt-2">
                      Due: {todo.dueDate}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      updateTodo(todo.id, {
                        status: todo.status === "todo" ? "done" : "todo",
                      })
                    }
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
