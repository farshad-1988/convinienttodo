export type Task = {
  subject: string;
  explain: string;
  dateCreated: Date;
  status: string;
  startDate: string | null;
  dueDate: string | null;
  id: string;
  userId: string;
};
