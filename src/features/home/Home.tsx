import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "../../shared/hooks/useAuthStorage";
import { useEffect } from "react";

const Home = () => {
  const authuser = useAuthStorage();
  console.log(authuser);
  const navigate = useNavigate();

  useEffect(() => {
    if (authuser) {
      navigate("/dashboard");
    }
    return;
  }, [authuser, navigate]);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to TaskMaster</h1>
      <p className="text-lg text-slate-600 mb-12">
        Your ultimate task management app. Stay organized, boost your
        productivity, and never miss a deadline again. Get started by creating
        your first task!
      </p>
      <p>please login to access your dashboard and manage your tasks.</p>
    </div>
  );
};

export default Home;
