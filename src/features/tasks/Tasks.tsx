import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import TaskCard from "./components/TaskCard";
import NewTaskBtn from "../../shared/components/NewTaskBtn";
import { container, item } from "../../shared/utils/framerMotion";
import { selectAllTodos } from "../../entities/task/selectors";
import { useAuthStorage } from "../../shared/hooks/useAuthStorage";

const Tasks = () => {
  const authuser = useAuthStorage();
  const tasks = useSelector(selectAllTodos);
  console.log(tasks);
  if (!authuser) return;
  const usersTask = tasks.filter((task) => task.userId === authuser.id);

  return (
    <div className="flex flex-col gap-2 mb-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        {usersTask.map((task, index) => {
          return (
            <motion.div variants={item} key={index}>
              <TaskCard key={index} task={task} />
            </motion.div>
          );
        })}
      </motion.div>

      <NewTaskBtn />

      {/* Bottom Blur Overlay */}
      {/* <div
        className="pointer-events-none fixed bottom-0 left-0 w-full h-[10vh] 
                  backdrop-blur-md
                  linear-gradient-to-t from-white/50 to-transparent"
      /> */}
    </div>
  );
};

export default Tasks;
