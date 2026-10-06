import {
  expandTodo,
  onComplete,
  undoComplete,
} from "../../../entities/task/todoSlice";
import type { Task } from "../../../entities/task/types";
import {
  formatStoredDate,
  isBeforeToday,
} from "../../../shared/utils/helperFunction";
import type { OnCompleteFunctionProps } from "../types/type";

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
  const dueLabel = task.dueDate ? formatStoredDate(task.dueDate) : null;
  const isOverdue = Boolean(
    task.dueDate && task.status !== "completed" && isBeforeToday(task.dueDate),
  );

  return { dueLabel, isOverdue };
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
