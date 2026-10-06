import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

import type { TaskProps } from "../types/type";
import useEdit from "../hooks/useEdit";

const EditCard = ({ task, setIsEditing }: TaskProps) => {
  const { register, handleSubmit, errors } = useEdit({ task, setIsEditing });
  const subjectId = `edit-subject-${task.id}`;
  const explainId = `edit-explain-${task.id}`;
  const dueDateId = `edit-due-${task.id}`;

  return (
    <form onSubmit={handleSubmit} className="relative space-y-3">
      <div>
        <label htmlFor={subjectId} className="sr-only">
          Subject
        </label>
        <input
          id={subjectId}
          className="w-full text-lg font-semibold text-white bg-slate-700/60 border border-slate-600 focus:border-blue-500 rounded-lg px-3 py-1.5 outline-none transition-colors"
          {...register("subject")}
          aria-invalid={errors.subject ? true : undefined}
          autoFocus
        />
        {errors.subject?.message && (
          <p className="mt-1 text-xs text-red-400" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor={explainId} className="sr-only">
          Explanation
        </label>
        <textarea
          id={explainId}
          className="w-full text-sm text-slate-300 bg-slate-700/60 border border-slate-600 focus:border-blue-500 rounded-lg px-3 py-2 outline-none resize-none transition-colors leading-relaxed"
          {...register("explain")}
          aria-invalid={errors.explain ? true : undefined}
          rows={3}
        />
        {errors.explain?.message && (
          <p className="mt-1 text-xs text-red-400" role="alert">
            {errors.explain.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor={dueDateId} className="block text-xs text-slate-400 mb-1">
          Due Date
        </label>
        <input
          id={dueDateId}
          type="date"
          {...register("dueDate")}
          aria-invalid={errors.dueDate ? true : undefined}
          className="w-full bg-slate-700/60 border border-slate-600 focus:border-blue-500 text-slate-200 rounded-lg px-3 py-1.5 outline-none text-sm [color-scheme:dark] transition-colors"
        />
        {errors.dueDate?.message && (
          <p className="mt-1 text-xs text-red-400" role="alert">
            {errors.dueDate.message}
          </p>
        )}
      </div>
      <AnimatePresence>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
        >
          <button
            type="submit"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Check className="w-3 h-3" aria-hidden="true" /> Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing?.(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <X className="w-3 h-3" aria-hidden="true" /> Cancel
          </button>
        </motion.div>
      </AnimatePresence>
    </form>
  );
};

export default EditCard;
