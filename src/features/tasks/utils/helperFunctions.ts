import {
  expandTodo,
  onComplete,
  undoComplete,
} from "../../../entities/task/todoSlice";
import type { Task } from "../../../entities/task/types";
import type { OnCompleteFunctionProps } from "../types/type";

export const formatDueDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const handleUndoComplete = ({
  dispatch,
  id,
  e,
}: OnCompleteFunctionProps) => {
  if (!id) throw new Error("Task ID is missing");
  e.stopPropagation();
  dispatch(undoComplete(id));
};

export const handleComplete = ({
  dispatch,
  id,
  e,
}: OnCompleteFunctionProps) => {
  if (!id) throw new Error("Task ID is missing");
  e.stopPropagation();
  dispatch(onComplete(id));
};

export function getDueDate({ task }: { task: Partial<Task> }) {
  const now = new Date();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && task.status !== "completed" && dueDate < now;

  return { dueDate, isOverdue };
}

export const handleExtendToEndOfDay = ({
  e,
  dispatch,
  id,
}: OnCompleteFunctionProps) => {
  e.stopPropagation();
  if (!id) throw new Error("Task ID is missing");
  dispatch(expandTodo(id));
};
