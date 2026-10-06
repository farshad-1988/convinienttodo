import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../../entities/user/selectors";
import { logoutUser } from "../../entities/user/userSlice";

const STORAGE_KEY = "auth_user";

export const useAuthStorage = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  const authUser = allUsers.find((user) => user.status === "authenticated") ?? null;

  useEffect(() => {
    if (authUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: authUser.id }));
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
  }, [authUser]);

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || event.newValue) return;
      dispatch(logoutUser());
    };

    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, [dispatch]);

  return authUser;
};
