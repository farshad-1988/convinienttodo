import { Calendar, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";
import { expandTodo } from "../../../../entities/task/todoSlice";
import type { Task } from "../../../../entities/task/types";
import { useDispatch } from "react-redux";
import { formatDueDate } from "../../utils/helperFunctions";

const DueDate = ({ task }: { task: Partial<Task> }) => {
  const now = new Date();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && task.status !== "completed" && dueDate < now;
  const dispatch = useDispatch();
  const handleExtendToEndOfDay = () => {
    if (!task.id) throw new Error("Task ID is missing");
    dispatch(expandTodo(task.id));
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div
        className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${
          isOverdue
            ? "bg-red-500/20 text-red-400 border border-red-500/30"
            : "bg-slate-700/60 text-slate-400"
        }`}
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>
          {isOverdue ? "Overdue · " : "Due · "}
          {dueDate && formatDueDate(dueDate)}
        </span>
      </div>

      {isOverdue && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleExtendToEndOfDay();
          }}
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition-colors font-medium"
          whileTap={{ scale: 0.95 }}
          title="Extend due date to end of today"
        >
          <CalendarClock className="w-3.5 h-3.5" />
          Extend to today
        </motion.button>
      )}
    </div>
  );
};

export default DueDate;
