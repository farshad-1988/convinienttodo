export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  status: "authenticated" | "unauthenticated";
  tasks: string[];
};
