// pages/LoginPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, LogIn } from "lucide-react";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const fieldClass = (invalid: boolean, extra = "pr-4") =>
  `w-full bg-slate-800/60 border ${
    invalid ? "border-red-500/50" : "border-slate-700/60"
  } rounded-xl pl-9 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-colors ${extra}`;

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const { register, handleSubmit, errors } = useLogin();

  return (
    <div className="min-h-[85vh]  flex items-center justify-center p-4">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="login-username"
              className="text-xs font-medium text-slate-400 tracking-wide"
            >
              Username
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="login-username"
                {...register("username")}
                autoComplete="username"
                placeholder="your_username"
                aria-invalid={errors.username ? true : undefined}
                aria-describedby={errors.username ? "login-username-error" : undefined}
                className={fieldClass(Boolean(errors.username))}
              />
            </div>
            {errors.username && (
              <p id="login-username-error" className="text-xs text-red-400" role="alert">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="login-password"
              className="text-xs font-medium text-slate-400 tracking-wide"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="login-password"
                {...register("password")}
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={errors.password ? "login-password-error" : undefined}
                className={fieldClass(Boolean(errors.password), "pr-10")}
              />
              <button
                type="button"
                onClick={() => setShowPw((current) => !current)}
                aria-label={showPw ? "Hide password" : "Show password"}
                aria-pressed={showPw}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="login-password-error" className="text-xs text-red-400" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 hover:border-blue-500/50 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
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
