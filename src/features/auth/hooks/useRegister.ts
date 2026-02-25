import { loginUser, registerUser } from "../../../entities/user/userSlice";
import type { User } from "../../../entities/user/types";
import type { RegisterFields } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/schemas";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../../entities/user/selectors";
import { nanoid } from "nanoid";

const useRegister = () => {
  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFields>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data: RegisterFields) => {
    const userData: User = {
      ...data,
      id: nanoid(),
      status: "unauthenticated",
      tasks: [],
    };
    const foundedUser = users.find((user) => user.username === data.username);
    if (foundedUser) {
      setError("username", {
        type: "manual",
        message: "username exists",
      });
      return;
    }
    dispatch(registerUser(userData));
    dispatch(loginUser({ id: userData.id }));
    navigate("/");
  };
  const submitfunc = handleSubmit(onSubmit);
  return { handleSubmit: submitfunc, register, errors };
};

export default useRegister;
