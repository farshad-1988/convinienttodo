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

const fieldClass = (invalid: boolean, extra = "") =>
  `w-full bg-slate-800/60 border ${
    invalid ? "border-red-500/50" : "border-slate-700/60"
  } rounded-xl pl-9 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-colors ${extra}`;

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const { register, handleSubmit, errors } = useRegister();

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs">
            <HardDrive className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              All data is stored in your browser&apos;s local memory and will be lost
              if cleared.
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="register-name"
              className="text-xs font-medium text-slate-400 tracking-wide"
            >
              Name
            </label>
            <div className="relative">
              <UserIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="register-name"
                {...register("name")}
                autoComplete="name"
                placeholder="Jane Doe"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "register-name-error" : undefined}
                className={fieldClass(Boolean(errors.name), "pr-4")}
              />
            </div>
            {errors.name && (
              <p id="register-name-error" className="text-xs text-red-400" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="register-username"
              className="text-xs font-medium text-slate-400 tracking-wide"
            >
              Username
            </label>
            <div className="relative">
              <UserIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                aria-hidden="true"
              />
              <input
                id="register-username"
                {...register("username")}
                autoComplete="username"
                placeholder="jane_doe"
                aria-invalid={errors.username ? true : undefined}
                aria-describedby={
                  errors.username ? "register-username-error" : undefined
                }
                className={fieldClass(Boolean(errors.username), "pr-4")}
              />
            </div>
            {errors.username && (
              <p
                id="register-username-error"
                className="text-xs text-red-400"
                role="alert"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="register-password"
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
                id="register-password"
                {...register("password")}
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={
                  errors.password ? "register-password-error" : undefined
                }
                className={fieldClass(Boolean(errors.password), "pr-10")}
              />
              <button
                type="button"
                onClick={() => setShowPw((current) => !current)}
                aria-label={showPw ? "Hide password" : "Show password"}
                aria-pressed={showPw}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Eye className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="register-password-error"
                className="text-xs text-red-400"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 border border-emerald-500/25 hover:border-emerald-500/50 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="w-4 h-4" aria-hidden="true" /> Create Account
          </motion.button>

          <p className="text-center text-xs text-slate-500">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
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
