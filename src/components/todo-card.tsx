import { Button } from "@/components/ui/button";
import { Todo } from "@/context/todo-types";
import { Trash2, Pencil } from "lucide-react";

export function TodoCard({
  todo,
  onUpdate,
  onDelete,
}: {
  todo: Todo;
  onUpdate: (data: { id: string; status: string }) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="p-4 rounded-lg border border-[#1d283a] bg-[#020817] group hover:border-blue-500/50 transition-colors">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <h3 className="text-white font-medium">{todo.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{todo.description}</p>
          {todo.dueDate && (
            <p className="text-gray-500 text-xs mt-2">Due: {todo.dueDate}</p>
          )}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpdate({ id: todo.id, status: "inProgress" })}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(todo.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
