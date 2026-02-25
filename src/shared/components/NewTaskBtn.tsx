import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
const NewTaskBtn = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleClick = async () => {
    await controls.start({
      scale: [1, 0.88, 1.08, 1],
      rotate: [0, 90],
      transition: { duration: 0.35, ease: "easeInOut" },
    });
    navigate("/new-task");
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full flex justify-center items-end pb-6 pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        height: "100px",
      }}
    >
      {/* Glow backdrop */}
      <motion.div
        className="absolute bottom-5 rounded-full pointer-events-none"
        style={{
          width: 72,
          height: 72,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.button
        animate={controls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        className="pointer-events-auto relative flex items-center justify-center cursor-pointer"
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.12) inset, 0 4px 24px rgba(99,102,241,0.55), 0 2px 8px rgba(0,0,0,0.4)",
          border: "none",
          outline: "none",
        }}
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label="Add new task"
      >
        {/* Inner highlight ring */}
        <span
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.18)",
            pointerEvents: "none",
          }}
        />

        <motion.span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <PlusIcon size={"40px"} strokeWidth={"2.5px"} />
        </motion.span>
      </motion.button>
    </div>
  );
};

export default NewTaskBtn;
