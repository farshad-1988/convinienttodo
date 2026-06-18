// import { Link, useNavigate } from "react-router-dom";
// import { ClipboardList, LogIn, LogOut } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../../entities/user/userSlice";
// import { useAuthStorage } from "../hooks/useAuthStorage";
// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const authuser = useAuthStorage();
//   const logout = () => {
//     dispatch(logoutUser());
//     navigate("/");
//   };

//   return (
//     <>
//       {" "}
//       {authuser ? (
//         <div className="flex justify-center p-4">
//           <div className="w-full flex justify-between gap-4">
//             <Link className="flex" to={"/dashboard"}>
//               tasks
//               <ClipboardList />
//             </Link>
//             <button
//               className="flex justify-center items-center"
//               onClick={() => logout()}
//             >
//               Logout
//               <LogOut />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button
//           className="flex justify-center items-center self-center w-full text-green-600"
//           onClick={() => {
//             navigate("/login");
//           }}
//         >
//           login
//           <LogIn />
//         </button>
//       )}
//     </>
//   );
// };

// export default Navbar;
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
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-100 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Home
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-green-600">
            Convinient Todo
          </span>
        </div>

        <div className="w-16 text-right">
          <span className="text-xs text-slate-400">
            {location.pathname === "/register" ? "Register" : "Login"}
          </span>
        </div>
      </header>
    );
  }

  return (
    <>
      {authuser ? (
        <div className="flex justify-center p-4">
          <div className="w-full flex justify-between gap-4">
            <Link className="flex" to={"/dashboard"}>
              tasks
              <ClipboardList />
            </Link>
            <button
              className="flex justify-center items-center"
              onClick={() => logout()}
            >
              Logout
              <LogOut />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex justify-center mt-6 items-center self-center w-full text-green-600"
          onClick={() => navigate("/login")}
        >
          login
          <LogIn />
        </button>
      )}
    </>
  );
};

export default Navbar;
