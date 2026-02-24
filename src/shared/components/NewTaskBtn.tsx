import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewTaskBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 m-auto h-20 w-full flex justify-center items-center  backdrop-blur-md bg-gradient-to-t from-black/80 to-transparent">
      <style>{`
    @keyframes fillBorder {
      to { stroke-dashoffset: 0; }
    }
    .border-fill:hover circle {
      animation: fillBorder 2s ease-in-out forwards;
    }
  `}</style>

      <button
        className="relative p-2 bg-slate-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer border-fill"
        onClick={() => navigate("/new-task")}
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          // viewBox="0 0 32 32"
        >
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="180"
            strokeDashoffset="180"
          />
        </svg>

        <span className="relative z-10">
          <PlusIcon />
        </span>
      </button>
    </div>
  );
};

export default NewTaskBtn;
