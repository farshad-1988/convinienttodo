import { type UseFormRegister } from "react-hook-form";
import type { taskSchema } from "../schemas/taskSchema";
import type z from "zod";

export type Inputs = z.infer<typeof taskSchema>;

export type todoInputProps = {
  error: string;
  register: UseFormRegister<Inputs>;
};
