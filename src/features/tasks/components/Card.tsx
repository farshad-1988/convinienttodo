import type { TaskProps } from "../types/type";
import ModificationBtn from "./cardComps/ActionButton";
import StatusSpan from "./cardComps/StatusSpan";
import DueDate from "./cardComps/DueDate";
import ActionBtn from "./cardComps/ToggleCompleteButton";

const Card = ({ task, setIsEditing, setShowDeleteConfirm }: TaskProps) => {
  if (!task.id) return null;
  const isCompleted = task.status === "completed";

  return (
    <>
      <div className="relative flex items-center justify-between mb-4">
        <StatusSpan isCompleted={isCompleted} />
        <ModificationBtn
          setIsEditing={setIsEditing}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
      </div>
      <h2 className="relative text-lg font-semibold text-white mb-2 line-clamp-2">
        {task.subject}
      </h2>

      <p className="relative text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {task.explain}
      </p>
      <DueDate task={task} />
      <ActionBtn isCompleted={isCompleted} id={task.id} />
    </>
  );
};

export default Card;
