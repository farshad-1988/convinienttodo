import z from "zod";

const dateField = (label: string) =>
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, `${label} is required`);

export const taskSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required").max(100),
  explain: z
    .string()
    .trim()
    .min(3, "Explanation is required")
    .max(1000, "Explanation must be 1000 characters or fewer"),
  startDate: dateField("Start date"),
  dueDate: dateField("Due date"),
});
