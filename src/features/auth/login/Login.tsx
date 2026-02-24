// pages/LoginPage.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, LogIn } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../../../entities/user/selectors";
import { loginUser } from "../../../entities/user/userSlice";

const schema = z.object({
  username: z.string().min(3, "At least 3 characters"),
  password: z.string().min(6, "At least 6 characters"),
});
type Fields = z.infer<typeof schema>;

const Login = () => {
  const users = useSelector(selectAllUsers);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Fields>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Fields) => {
    const match = users.find(
      (u) => u.username === data.username && u.password === data.password,
    );
    if (!match) {
      setError("username", { message: "Invalid username or password" });
      return;
    }
    dispatch(loginUser({ id: match.id }));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-sm bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-0.5">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 tracking-wide">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                {...register("username")}
                placeholder="your_username"
                className={`w-full bg-slate-800/60 border ${
                  errors.username ? "border-red-500/50" : "border-slate-700/60"
                } rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600
                  focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-colors`}
              />
            </div>
            {errors.username && (
              <p className="text-xs text-red-400">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                {...register("password")}
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full bg-slate-800/60 border ${
                  errors.password ? "border-red-500/50" : "border-slate-700/60"
                } rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder:text-slate-600
                  focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-colors`}
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 hover:border-blue-500/50 text-sm font-medium transition-all"
            whileTap={{ scale: 0.98 }}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </motion.button>

          <p className="text-center text-xs text-slate-500">
            No account?{" "}
            <Link
              to="/register"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
