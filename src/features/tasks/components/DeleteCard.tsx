import { motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import type { TaskProps } from "../types/type";
import { removeTodo } from "../../../entities/task/todoSlice";
import { removeTaskIdfromUser } from "../../../entities/user/userSlice";
import { useAuthStorage } from "../../../shared/hooks/useAuthStorage";
const DeleteCard = ({ task, setShowDeleteConfirm }: TaskProps) => {
  const authuser = useAuthStorage();
  const dispatch = useDispatch();
  if (!authuser || !task.id) return null;
  const taskId = task.id;
  const titleId = `delete-task-${taskId}`;
  return (
    <motion.div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="absolute inset-0 bg-slate-900/95 rounded-2xl flex flex-col items-center justify-center gap-4 z-20 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2 text-red-400">
        <AlertTriangle className="w-5 h-5" />
        <span id={titleId} className="text-sm font-semibold">
          Delete this task?
        </span>
      </div>
      <p className="text-slate-400 text-xs text-center line-clamp-2">
        "{task.subject}" will be permanently removed.
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            dispatch(removeTodo(taskId));
            dispatch(removeTaskIdfromUser({ userId: authuser.id, taskId }));
            setShowDeleteConfirm?.(false);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <Trash2 className="w-3 h-3" /> Delete
        </button>
        <button
          type="button"
          onClick={() => setShowDeleteConfirm?.(false)}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <X className="w-3 h-3" /> Cancel
        </button>
      </div>
    </motion.div>
  );
};

export default DeleteCard;
