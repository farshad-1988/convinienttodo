const StatusSpan = ({ isCompleted }: { isCompleted: boolean }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
        isCompleted ? "bg-emerald-500" : "bg-slate-500"
      }`}
    >
      {isCompleted ? "Completed" : "Pending"}
    </span>
  );
};

export default StatusSpan;
