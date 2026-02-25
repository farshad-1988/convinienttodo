import type z from "zod";
import type { Task } from "../../../entities/task/types";
import type { AppDispatch } from "../../../store/store";
import type { taskSchema } from "../schemas/schemas";

export type SetBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export type TaskProps = {
  task: Partial<Task>;
  setIsEditing?: SetBoolean;
  setShowDeleteConfirm?: SetBoolean;
};

export type OnCompleteFunctionProps = {
  dispatch: AppDispatch;
  id: string;
  e: React.MouseEvent<HTMLButtonElement>;
};

export type Inputs = z.infer<typeof taskSchema>;
