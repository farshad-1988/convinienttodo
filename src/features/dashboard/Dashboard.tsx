// import { tasks } from "../../data/mockdata";
// import PartialTaskInfo from "../../shared/components/PartialTaskInfo";
// import { motion } from "framer-motion";
// import { container, item } from "../../shared/utils/framerMotion";
// import NewTaskBtn from "../../shared/components/NewTaskBtn";
// const Dashboard = () => {
//   return (
//     <div className="mb-12">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//       <p className="text-lg text-slate-600 mb-4">
//         Welcome to your dashboard! Here you can quickly access your tasks and
//         manage your to-do list.
//       </p>
//       <motion.div
//         variants={container}
//         initial={"hidden"}
//         animate={"show"}
//         className="flex flex-col gap-2"
//       >
//         {tasks.map((task, index) => (
//           <motion.div variants={item}>
//             <PartialTaskInfo key={index} task={task} />
//           </motion.div>
//         ))}
//       </motion.div>
//       <NewTaskBtn />
//     </div>
//   );
// };

// export default Dashboard;
