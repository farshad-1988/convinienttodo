import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

import type { TaskProps } from "../types/type";
import useEdit from "../hooks/useEdit";
const EditCard = ({ task, setIsEditing }: TaskProps) => {
  const { register, handleSubmit } = useEdit({ task, setIsEditing });

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="relative w-full text-lg font-semibold text-white mb-3 bg-slate-700/60 border border-slate-600 focus:border-blue-500 rounded-lg px-3 py-1.5 outline-none transition-colors"
        {...register("subject")}
        autoFocus
      />
      <textarea
        className="relative w-full text-sm text-slate-300 bg-slate-700/60 border border-slate-600 focus:border-blue-500 rounded-lg px-3 py-2 outline-none resize-none transition-colors leading-relaxed mb-3"
        {...register("explain")}
        rows={3}
      />
      <div>
        <label className="block text-xs text-slate-400 mb-1">Due Date</label>
        <input
          type="date"
          {...register("dueDate")}
          className="w-full bg-slate-700/60 border border-slate-600 focus:border-blue-500 text-slate-200 rounded-lg px-3 py-1.5 outline-none text-sm [color-scheme:dark] transition-colors"
        />
      </div>{" "}
      {/* Edit actions */}
      <AnimatePresence>
        <motion.div
          className="relative flex items-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
        >
          <button
            // onClick={handleSubmit}
            type="submit"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors"
          >
            <Check className="w-3 h-3" /> Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing?.(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium rounded-lg transition-colors"
          >
            <X className="w-3 h-3" /> Cancel
          </button>
        </motion.div>
      </AnimatePresence>
    </form>
  );
};

export default EditCard;
