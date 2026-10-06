import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { TaskProps } from "../../types/type";
const ModificationBtn = ({
  setIsEditing,
  setShowDeleteConfirm,
}: Partial<TaskProps>) => {
  return (
    <div className="flex items-center gap-1">
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing?.(true);
        }}
        type="button"
        className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        whileTap={{ scale: 0.9 }}
        aria-label="Edit task"
      >
        <Pencil className="w-3.5 h-3.5" />
      </motion.button>
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setShowDeleteConfirm?.(true);
        }}
        type="button"
        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        whileTap={{ scale: 0.9 }}
        aria-label="Delete task"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
};

export default ModificationBtn;
