import { useState } from "react";
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

export function Dashboard() {
  const { toast } = useToast();
  const { todos, createTodo, updateTodo, deleteTodo } = useTodo();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  async function handleCreateTodo() {
    try {
      if (newTodo.title.trim()) {
        await createTodo({
          ...newTodo,
          status: "todo",
          completed: false,
        });
        setNewTodo({ title: "", description: "", dueDate: "" });
        setIsDialogOpen(false);
        toast({
          title: "Success",
          description: "Todo created successfully",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create todo",
      });
    }
  }

  const filterTodosByStatus = (status: "todo" | "inProgress" | "done") =>
    todos.filter((todo) => todo.status === status);

  return (
    <div className="min-h-screen bg-[#020817] p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Tasks</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-5 w-5" />
                <span className="ml-2">New task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#030a1c] border-[#1d283a]">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Create New Task
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Task title"
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })
                  }
                  className="bg-[#020817] border-[#1d283a] text-white"
                />
                <Textarea
                  placeholder="Task description"
                  value={newTodo.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setNewTodo({ ...newTodo, description: e.target.value })
                  }
                  className="bg-[#020817] border-[#1d283a] text-white"
                />
                <Input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, dueDate: e.target.value })
                  }
                  className="bg-[#020817] border-[#1d283a] text-white"
                />
                <Button onClick={handleCreateTodo} className="w-full">
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Todo Column */}
          <div className="bg-blue-50/5 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="h-2 w-2 bg-blue-500 rounded-full mr-2" />
              To do
            </h2>
            <div className="space-y-3">
              {filterTodosByStatus("todo").map((todo) => (
                <div
                  key={todo.id}
                  className="bg-[#030a1c] p-4 rounded-lg border border-[#1d283a] group hover:border-blue-500/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{todo.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {todo.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        {todo.dueDate}
                      </p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateTodo(todo.id, { status: "inProgress" })
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar structure for In Progress and Done columns */}
        </div>
      </div>
    </div>
  );
}
