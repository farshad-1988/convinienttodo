import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Check,
  Trash2,
  Pencil,
  X,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";
import { useState } from "react";
import type { Task } from "../types/types";
import { toLocalDateString } from "../utils/helperFunctions";
import { useDispatch } from "react-redux";
import {
  editTodo,
  expandTodo,
  onComplete,
  removeTodo,
} from "../slice/todoSlice";

const TaskCard = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editSubject, setEditSubject] = useState(task.subject);
  const [editExplain, setEditExplain] = useState(task.explain);
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? toLocalDateString(new Date(task.dueDate)) : "",
  );

  const now = new Date();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && task.status !== "completed" && dueDate < now;

  //implement useedit hook
  const handleEditSave = () => {
    dispatch(
      editTodo({
        id: task.id,
        changes: {
          subject: editSubject,
          explain: editExplain,
          dueDate: editDueDate ? new Date(editDueDate).toISOString() : null,
        },
      }),
    );
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditSubject(task.subject);
    setEditExplain(task.explain);
    setEditDueDate(
      task.dueDate ? toLocalDateString(new Date(task.dueDate)) : "",
    );
    setIsEditing(false);
  };

  const handleExtendToEndOfDay = () => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    dispatch(expandTodo(task.id));
  };

  const formatDueDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 overflow-hidden group"
      whileHover={{ scale: isEditing || showDeleteConfirm ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hover bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/40 transition-colors duration-300 pointer-events-none" />

      {/* Top row: status badge + small action buttons */}
      <div className="relative flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            task.status === "completed" ? "bg-emerald-500" : "bg-slate-500"
          }`}
        >
          {task.status === "completed" ? "Completed" : "Pending"}
        </span>

        {/* Edit + Delete */}
        {!isEditing && !showDeleteConfirm && (
          <div className="flex items-center gap-1">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 hover:text-blue-300 transition-colors"
              whileTap={{ scale: 0.9 }}
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-colors"
              whileTap={{ scale: 0.9 }}
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Subject */}
      {isEditing ? (
        <input
          className="relative w-full text-lg font-semibold text-white mb-3 bg-slate-700/60 border border-slate-600 focus:border-blue-500 rounded-lg px-3 py-1.5 outline-none transition-colors"
          value={editSubject}
          onChange={(e) => setEditSubject(e.target.value)}
          autoFocus
        />
      ) : (
        <h3 className="relative text-lg font-semibold text-white mb-2 line-clamp-2">
          {task.subject}
        </h3>
      )}

      {/* Explanation */}
      {isEditing ? (
        <textarea
          className="relative w-full text-sm text-slate-300 bg-slate-700/60 border border-slate-600 focus:border-blue-500 rounded-lg px-3 py-2 outline-none resize-none transition-colors leading-relaxed mb-3"
          value={editExplain}
          onChange={(e) => setEditExplain(e.target.value)}
          rows={3}
        />
      ) : (
        <p className="relative text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {task.explain}
        </p>
      )}

      {/* Due date row */}
      <div className="relative mb-4">
        {isEditing ? (
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full bg-slate-700/60 border border-slate-600 focus:border-blue-500 text-slate-200 rounded-lg px-3 py-1.5 outline-none text-sm [color-scheme:dark] transition-colors"
            />
          </div>
        ) : dueDate ? (
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
                {formatDueDate(dueDate)}
              </span>
            </div>

            {/* Extend button — only when overdue */}
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
        ) : (
          <span className="text-xs text-slate-600 italic">No due date set</span>
        )}
      </div>

      {/* Edit actions */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="relative flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
          >
            <button
              onClick={handleEditSave}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Check className="w-3 h-3" /> Save
            </button>
            <button
              onClick={handleEditCancel}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium rounded-lg transition-colors"
            >
              <X className="w-3 h-3" /> Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mark as complete button */}
      {!isEditing && !showDeleteConfirm && task.status !== "completed" && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(onComplete(task.id));
          }}
          className="relative w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 border border-emerald-500/25 hover:border-emerald-500/50 text-sm font-medium transition-all duration-200"
          whileTap={{ scale: 0.98 }}
        >
          <Check className="w-4 h-4" />
          Mark as Completed
        </motion.button>
      )}

      {/* Delete confirmation overlay */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className="absolute inset-0 bg-slate-900/95 rounded-2xl flex flex-col items-center justify-center gap-4 z-20 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-semibold">Delete this task?</span>
            </div>
            <p className="text-slate-400 text-xs text-center line-clamp-2">
              "{task.subject}" will be permanently removed.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  dispatch(removeTodo(task.id));
                  setShowDeleteConfirm(false);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium rounded-lg transition-colors"
              >
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskCard;
