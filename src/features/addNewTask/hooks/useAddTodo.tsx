import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
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
import { useEffect } from "react";

const subjectMap: Record<string, string> = {
  programing: "Node, JS, React, Vue",
  design: "Figma, UI, UX",
  devops: "Docker, CI/CD, AWS",
};

const useAddTodo = () => {
  const navigate = useNavigate();
  const authuser = useAuthStorage();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
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

  const subject = useWatch({
    control,
    name: "subject",
  });

  useEffect(() => {
    const preset = subjectMap[subject];
    if (preset) {
      setValue("explain", preset, { shouldValidate: true });
    }
  }, [setValue, subject]);

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
      startDate: startDate || null,
      dueDate: dueDate || null,
      dateCreated: new Date().toISOString(),
      status: "pending",
      userId: authuser.id,
    };

    try {
      dispatch(addTodo(todoData));
      dispatch(addTaskIdToUser({ taskId: todoData.id, userId: authuser.id }));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  const sumitFunc = handleSubmit(onSubmit);
  return { handleSubmit: sumitFunc, register, errors };
};

export default useAddTodo;
