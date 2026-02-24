import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDefaults } from "../utils/helperFunctions";

import { addTodo } from "../../../entities/task/todoSlice";
import type { Task } from "../../../entities/task/types";
import type { Inputs } from "../types/types";
import { taskSchema } from "../schemas/taskSchema";
import { nanoid } from "nanoid";
import { useAuthStorage } from "../../../shared/hooks/useAuthStorage";
import { addTaskIdToUser } from "../../../entities/user/userSlice";

const useAddTodo = () => {
  const navigate = useNavigate();
  const authuser = useAuthStorage();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(taskSchema),
    defaultValues: {
      dueDate: getDefaults().dueDate,
      startDate: getDefaults().startDate,
      subject: "",
      explain: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async ({
    subject,
    dueDate,
    startDate,
    explain,
  }) => {
    // e.preventDefault();
    if (!authuser) {
      alert("please login to add new task");
      navigate("/login");
      return;
    }

    const todoData: Task = {
      id: nanoid(),
      subject,
      explain,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      dateCreated: new Date(),
      status: "pending",
      userId: authuser.id,
    };

    try {
      dispatch(addTodo(todoData));
      dispatch(addTaskIdToUser({ taskId: todoData.id, authuser }));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  const sumitFunc = handleSubmit(onSubmit);
  return { handleSubmit: sumitFunc, register, errors };
};

export default useAddTodo;
