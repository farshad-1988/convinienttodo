import { motion } from "framer-motion";
import TaskCard from "./components/TaskCard";
import NewTaskBtn from "../../shared/components/NewTaskBtn";
import { container, item } from "../../shared/utils/framerMotion";
import useFilterTask from "./hooks/useFilterTask";
import type { Task } from "../../entities/task/types";

const Tasks = () => {
  const { userTasks }: { userTasks: Task[] } = useFilterTask();

  return (
    <section className="flex flex-col gap-4 mb-24" aria-labelledby="tasks-heading">
      <h1 id="tasks-heading" className="text-2xl font-semibold text-slate-100">
        Your tasks
      </h1>
      {userTasks.length === 0 ? (
        <p className="text-slate-400 text-sm py-10 text-center">
          No tasks yet. Use the add button to create one.
        </p>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          {userTasks.map((task) => (
            <motion.div variants={item} key={task.id}>
              <TaskCard task={task} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <NewTaskBtn />
    </section>
  );
};

export default Tasks;
