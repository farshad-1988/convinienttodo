import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import type { Inputs, TaskProps } from "../types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTodo } from "../../../entities/task/todoSlice";
import { calendarDate } from "../../../shared/utils/helperFunction";
import { taskSchema } from "../schemas/schemas";

const useEdit = ({ task, setIsEditing }: TaskProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(taskSchema),
    defaultValues: {
      subject: task.subject ?? "",
      explain: task.explain ?? "",
      dueDate: task.dueDate ? (calendarDate(task.dueDate) ?? "") : "",
    },
  });
  const dispatch = useDispatch();
  const onSubmit = (inputs: Inputs) => {
    if (!task.id) throw new Error("task id is missing");
    dispatch(
      editTodo({
        id: task.id,
        changes: {
          subject: inputs.subject,
          explain: inputs.explain,
          dueDate: calendarDate(inputs.dueDate),
        },
      }),
    );
    setIsEditing?.(false);
  };

  const submitFunction = handleSubmit(onSubmit);

  return { handleSubmit: submitFunction, register, errors };
};

export default useEdit;
