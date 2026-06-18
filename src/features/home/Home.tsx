import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "../../shared/hooks/useAuthStorage";
import { useEffect } from "react";

const Home = () => {
  const authuser = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (authuser) {
      navigate("/dashboard");
    }
    return;
  }, [authuser, navigate]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-600 mb-6 shadow-lg">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-slate-300 tracking-tight mb-3">
          Convinient Todo
        </h1>

        <p className="text-slate-500 text-base mb-4 leading-relaxed">
          A simple offline task manager
        </p>

        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          No server, no sync — your data stays on this machine.
        </p>

        <p className="text-sm text-slate-400">
          Register and Login to access your dashboard and start managing tasks.
        </p>
      </div>
    </div>
  );
};

export default Home;
