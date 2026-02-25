import { useSelector } from "react-redux";
import { selectAllTodos } from "../../../entities/task/selectors";
import { useAuthStorage } from "../../../shared/hooks/useAuthStorage";

const useFilterTask = () => {
  const authuser = useAuthStorage();

  const tasks = useSelector(selectAllTodos);
  if (!authuser) return { userTasks: [] };
  const userTasks = tasks.filter((task) => task.userId === authuser.id);

  return { userTasks };
};

export default useFilterTask;
