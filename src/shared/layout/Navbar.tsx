import { Link, useNavigate, useLocation } from "react-router-dom";
import { ClipboardList, LogIn, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../entities/user/userSlice";
import { useAuthStorage } from "../hooks/useAuthStorage";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authuser = useAuthStorage();
  const location = useLocation();

  const logout = () => {
    if (!confirm("Are you sure to log out from this account ?")) return;
    dispatch(logoutUser());
    navigate("/");
  };

  if (location.pathname === "/register" || location.pathname === "/login") {
    return (
      <header className="flex items-center justify-between gap-3 px-2 sm:px-6 py-4 border-b border-slate-700/60">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Home
        </button>

        <Link to="/" className="text-sm font-semibold text-green-600">
          Convinient Todo
        </Link>

        <p className="w-16 text-right text-xs text-slate-400">
          {location.pathname === "/register" ? "Register" : "Login"}
        </p>
      </header>
    );
  }

  return (
    <header className="py-4">
      {authuser ? (
        <nav className="flex items-center justify-between gap-3" aria-label="Account">
          <Link
            className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded px-1 py-1"
            to="/dashboard"
            aria-current={location.pathname === "/dashboard" ? "page" : undefined}
          >
            Tasks
            <ClipboardList className="w-4 h-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded px-1 py-1"
            onClick={logout}
          >
            Logout
            <LogOut className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      ) : (
        <nav className="flex justify-center" aria-label="Account">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded px-2 py-1"
            onClick={() => navigate("/login")}
          >
            Log in
            <LogIn className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
