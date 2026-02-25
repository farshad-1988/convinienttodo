// src/shared/hooks/useSyncAuthUser.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../entities/user/selectors";

const STORAGE_KEY = "auth_user";

export const useAuthStorage = () => {
  const allUsers = useSelector(selectAllUsers);
  const authUser = allUsers.find((u) => u.status === "authenticated") ?? null;

  // sync to localStorage whenever the authenticated user changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    }
    // else {
    //   localStorage.removeItem(STORAGE_KEY);
    // }
  }, [authUser]);

  // listen for changes made in other tabs
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      // other tab logged out
      if (!e.newValue) window.location.href = "/login";
    };

    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, []);

  return authUser;
};
