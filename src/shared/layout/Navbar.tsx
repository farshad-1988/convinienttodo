import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, LogIn, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../entities/user/userSlice";
import { useAuthStorage } from "../hooks/useAuthStorage";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authuser = useAuthStorage();
  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="flex justify-between p-4">
      <div className="flex">
        <Link to={authuser ? "/dashboard" : "/"}>Logo</Link>
      </div>
      {authuser ? (
        <div className="flex gap-4">
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
      ) : (
        <button
          className="flex justify-center items-center"
          onClick={() => {
            navigate("/login");
          }}
        >
          login
          <LogIn />
        </button>
      )}
    </div>
  );
};

export default Navbar;
