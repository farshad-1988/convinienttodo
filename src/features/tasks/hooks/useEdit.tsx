import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import type { TaskProps } from "../types/type";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTodo } from "../../../entities/task/todoSlice";

const taskSchema = z.object({
  subject: z.string().min(1, "subject is required").max(100),
  explain: z
    .string()
    .min(3, "explaination is required")
    .max(1000, "more than 1000 letter is not allowed"),
  dueDate: z.string().min(1, "Due date is required"),
});
type Inputs = z.infer<typeof taskSchema>;

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
      dueDate: task.dueDate ?? "",
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
          dueDate: inputs.dueDate
            ? new Date(inputs.dueDate).toISOString()
            : null,
        },
      }),
    );
    setIsEditing?.(false);
  };

  const submitFunction = handleSubmit(onSubmit);

  return { handleSubmit: submitFunction, register, errors };
};

export default useEdit;
