import { configureStore, type EntityState } from "@reduxjs/toolkit";
import todosReducer from "../entities/task/todoSlice";
import usersReducer from "../entities/user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import type { Task } from "../entities/task/types";
import type { User } from "../entities/user/types";

const persistTodosConfig = {
  key: "todos",
  storage,
};
const persistUsersConfig = {
  key: "users",
  storage,
};

const persistTodoReducer = persistReducer(persistTodosConfig, todosReducer);
const persistUsersReducer = persistReducer(persistUsersConfig, usersReducer);

export const store = configureStore({
  reducer: {
    todos: persistTodoReducer,
    users: persistUsersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  todos: EntityState<Task, string>;
  users: EntityState<User, string>;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
