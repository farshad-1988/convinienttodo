import { loginUser } from "../../../entities/user/userSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../../../entities/user/selectors";
import { useNavigate } from "react-router-dom";
import type { LoginFields } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/schemas";
import { hashPassword } from "../../../shared/utils/helperFunction";

const useLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });
  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFields) => {
    const hashedPassword = await hashPassword(data.password);
    const match = users.find(
      (u) => u.username === data.username && u.password === hashedPassword,
    );
    if (!match) {
      setError("username", { message: "Invalid username or password" });
      return;
    }
    dispatch(loginUser({ id: match.id }));
    navigate("/");
  };
  const submitFunc = handleSubmit(onSubmit);
  return { register, handleSubmit: submitFunc, errors };
};

export default useLogin;
