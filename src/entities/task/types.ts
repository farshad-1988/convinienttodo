export type TaskStatus = "pending" | "completed";

export type Task = {
  subject: string;
  explain: string;
  dateCreated: string;
  status: TaskStatus;
  startDate: string | null;
  dueDate: string | null;
  id: string;
  userId: string;
};
