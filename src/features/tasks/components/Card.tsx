import type { TaskProps } from "../types/type";
import ModificationBtn from "./cardComps/ModificationBtn";
import StatusSpan from "./cardComps/StatusSpan";
import DueDate from "./cardComps/DueDate";
import ActionBtn from "./cardComps/ActionBtn";

const Card = ({ task, setIsEditing, setShowDeleteConfirm }: TaskProps) => {
  const isCompleted = task.status === "completed";

  if (!task.id) throw new Error("id is missing");
  return (
    <>
      {/* Top row: status badge + action buttons */}
      <div className="relative flex items-center justify-between mb-4">
        <StatusSpan isCompleted={isCompleted} />
        <ModificationBtn
          setIsEditing={setIsEditing}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
      </div>
      <h3 className="relative text-lg font-semibold text-white mb-2 line-clamp-2">
        {task.subject}
      </h3>

      <p className="relative text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {task.explain}
      </p>
      <DueDate task={task} />
      <ActionBtn isCompleted={isCompleted} id={task.id} />
    </>
  );
};

export default Card;
