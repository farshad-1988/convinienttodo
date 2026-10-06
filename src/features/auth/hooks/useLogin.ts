import { loginUser } from "../../../entities/user/userSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../../../entities/user/selectors";
import { useLocation, useNavigate } from "react-router-dom";
import type { LoginFields } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/schemas";
import { verifyPassword } from "../../../shared/utils/helperFunction";

const useLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });
  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFields) => {
    const match = users.find((user) => user.username === data.username);
    const passwordMatches = match
      ? await verifyPassword(data.password, match.password)
      : false;
    if (!match || !passwordMatches) {
      setError("username", { message: "Invalid username or password" });
      return;
    }
    dispatch(loginUser({ id: match.id }));
    const requested = (location.state as { from?: string } | null)?.from;
    const destination =
      requested && requested.startsWith("/") && !requested.startsWith("//")
        ? requested
        : "/dashboard";
    navigate(destination, { replace: true });
  };
  const submitFunc = handleSubmit(onSubmit);
  return { register, handleSubmit: submitFunc, errors };
};

export default useLogin;
