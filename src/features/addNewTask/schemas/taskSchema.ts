import z from "zod";

export const taskSchema = z.object({
  subject: z.string().min(1, "subject is required").max(100),
  explain: z
    .string()
    .min(3, "explaination is required")
    .max(1000, "more than 1000 letter is not allowed"),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
});
