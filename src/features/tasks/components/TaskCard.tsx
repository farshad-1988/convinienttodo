import { motion, AnimatePresence } from "framer-motion";

import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import Card from "./Card";
import { useState } from "react";
import type { Task } from "../../../entities/task/types";

const TaskCard = ({ task }: { task: Task }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 overflow-hidden group"
      whileHover={{ scale: isEditing || showDeleteConfirm ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hover bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/40 transition-colors duration-300 pointer-events-none" />
      {/* Subject */}
      {isEditing ? (
        <EditCard task={task} setIsEditing={setIsEditing} />
      ) : (
        <Card
          task={task}
          setIsEditing={setIsEditing}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
      )}
      {/* Delete confirmation overlay */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <DeleteCard task={task} setShowDeleteConfirm={setShowDeleteConfirm} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskCard;
