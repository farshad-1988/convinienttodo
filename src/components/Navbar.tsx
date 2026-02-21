import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, LogIn, LogOut } from "lucide-react";
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const logout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="flex justify-between p-4">
      <div className="flex">
        <Link to={isLoggedIn ? "/dashboard" : "/"}>Logo</Link>
      </div>
      {isLoggedIn ? (
        <div className="flex gap-4">
          <Link className="flex" to={"/tasks"}>
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
            setIsLoggedIn(true);
            navigate("/dashboard");
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
