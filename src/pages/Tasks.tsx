// import { tasks } from "../data/mockdata";
import TaskCard from "../components/TaskCard";
import NewTaskBtn from "../components/NewTaskBtn";
import { motion } from "framer-motion";
import { container, item } from "../utils/framerMotion";
import { useSelector } from "react-redux";
import { selectAllTodos } from "../slice/todoSlice";
const Tasks = () => {
  const tasks = useSelector(selectAllTodos);

  return (
    <div className="flex flex-col gap-2 mb-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        {tasks.map((task, index) => {
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
