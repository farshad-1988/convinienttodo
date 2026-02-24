import type { Task } from "../../../entities/task/types";

export type SetBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export type TaskProps = {
  task: Partial<Task>;
  setIsEditing?: SetBoolean;
  setShowDeleteConfirm?: SetBoolean;
};
