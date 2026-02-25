// pages/RegisterPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  User as UserIcon,
  UserPlus,
  HardDrive,
} from "lucide-react";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const { register, handleSubmit, errors } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-sm bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Create account</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Get started in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Local storage notice */}
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs">
            <HardDrive className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>
              All data is stored in your browser's local memory and will be lost
              if cleared.
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 tracking-wide">
              Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                {...register("name")}
                placeholder="Jane Doe"
                className={`w-full bg-slate-800/60 border ${
                  errors.name ? "border-red-500/50" : "border-slate-700/60"
                } rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600
                  focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-colors`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 tracking-wide">
              Username
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                {...register("username")}
                placeholder="jane_doe"
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
            className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 border border-emerald-500/25 hover:border-emerald-500/50 text-sm font-medium transition-all"
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="w-4 h-4" /> Create Account
          </motion.button>

          <p className="text-center text-xs text-slate-500">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
