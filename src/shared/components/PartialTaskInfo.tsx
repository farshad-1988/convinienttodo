// import { motion } from "framer-motion";
// import { Calendar, Activity } from "lucide-react";
// import type { Task } from "../../entities/task/types";

// const PartialTaskInfo = ({ task }: { task: Partial<Task> }) => {
//   return (
//     <motion.div
//       className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 overflow-hidden group cursor-pointer"
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.2 }}
//     >
//       {/* Animated background gradient on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//       {/* Status indicator */}
//       <div className="relative flex items-center justify-between mb-4">
//         <span
//           className={`${task.status === "completed" ? "bg-emerald-500" : "bg-amber-500"} px-3 py-1 rounded-full text-xs font-medium text-white`}
//         >
//           {task.status}
//         </span>
//         <div className="flex items-center gap-1 text-slate-400 text-sm">
//           <Calendar className="w-4 h-4" />
//           <span>
//             {task.dateCreated &&
//               task.dateCreated.toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })}
//           </span>
//         </div>
//       </div>

//       {/* Subject - always visible */}
//       <h3 className="relative text-xl font-semibold text-white mb-3 line-clamp-2">
//         {task.subject}
//       </h3>

//       {/* Explanation - partially hidden */}
//       <div className="relative h-12 overflow-hidden">
//         <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
//           {task.explain}
//         </p>

//         {/* Gradient fade overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 group-hover:opacity-0 transition-opacity duration-300" />
//       </div>

//       {/* Expand hint */}
//       <div className="relative mt-4 flex items-center gap-2 text-slate-500 text-xs group-hover:text-blue-400 transition-colors">
//         <Activity className="w-3 h-3" />
//         <span>Hover to view details</span>
//       </div>

//       {/* Hover border effect */}
//       <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/50 transition-colors duration-300 pointer-events-none" />
//     </motion.div>
//   );
// };

// export default PartialTaskInfo;
