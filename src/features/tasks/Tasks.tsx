import { motion } from "framer-motion";
import TaskCard from "./components/TaskCard";
import NewTaskBtn from "../../shared/components/NewTaskBtn";
import { container, item } from "../../shared/utils/framerMotion";
import useFilterTask from "./hooks/useFilterTask";
import type { Task } from "../../entities/task/types";

const Tasks = () => {
  const { userTasks }: { userTasks: Task[] } = useFilterTask();

  return (
    <div className="flex flex-col gap-2 mb-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        {userTasks.map((task, index) => {
          return (
            <motion.div variants={item} key={index}>
              <TaskCard key={index} task={task} />
            </motion.div>
          );
        })}
      </motion.div>

      <NewTaskBtn />
    </div>
  );
};

export default Tasks;
