import { Check, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  handleComplete,
  handleUndoComplete,
} from "../../utils/helperFunctions";

const ActionBtn = ({
  isCompleted,
  id,
}: {
  isCompleted: boolean;
  id: string;
}) => {
  const dispatch = useDispatch();
  if (isCompleted) {
    return (
      <motion.button
        onClick={(e) => {
          handleUndoComplete({ dispatch, id, e });
        }}
        className="relative w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-500/15 hover:bg-slate-500/30 text-slate-400 hover:text-slate-300 border border-slate-500/25 hover:border-slate-500/50 text-sm font-medium transition-all duration-200"
        whileTap={{ scale: 0.98 }}
      >
        <RotateCcw className="w-4 h-4" />
        Undo Complete
      </motion.button>
    );
  } else {
    return (
      <motion.button
        onClick={(e) => handleComplete({ dispatch, id, e })}
        className="relative w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 border border-emerald-500/25 hover:border-emerald-500/50 text-sm font-medium transition-all duration-200"
        whileTap={{ scale: 0.98 }}
      >
        <Check className="w-4 h-4" />
        Mark as Completed
      </motion.button>
    );
  }
};

export default ActionBtn;
