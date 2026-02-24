import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "./types";

export const usersAdaptor = createEntityAdapter<User>();

export const userSlice = createSlice({
  name: "users",
  initialState: usersAdaptor.getInitialState(),
  reducers: {
    registerUser: usersAdaptor.addOne,
    addTaskIdToUser(
      state,
      { payload }: PayloadAction<{ taskId: string; authuser: User }>,
    ) {
      const { taskId, authuser } = payload;
      usersAdaptor.updateOne(state, {
        id: authuser.id,
        changes: {
          tasks: [...authuser.tasks, taskId],
        },
      });
    },
    removeTaskIdfromUser(
      state,
      { payload }: PayloadAction<{ taskId: string; authuser: User }>,
    ) {
      const { taskId, authuser } = payload;
      usersAdaptor.updateOne(state, {
        id: authuser.id,
        changes: {
          tasks: authuser.tasks.filter((id) => id !== taskId),
        },
      });
    },
    loginUser(state, { payload }: PayloadAction<{ id: string }>) {
      //   const foundUser = Object.values(state.entities).find(
      //     (user) => user.username === username,
      //   );
      //   if (!foundUser) {
      //     throw new Error("user with this username is not exists");
      //   }
      //   const match = foundUser.password === password;
      //   if (!match) {
      //     throw new Error("password is incorrect");
      //   }
      usersAdaptor.updateMany(
        state,
        state.ids.map((id) => ({ id, changes: { status: "unauthenticated" } })),
      );
      usersAdaptor.updateOne(state, {
        id: payload.id,
        changes: {
          status: "authenticated",
        },
      });
    },
    logoutUser(state) {
      usersAdaptor.updateMany(
        state,
        state.ids.map((id) => ({ id, changes: { status: "unauthenticated" } })),
      );
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  addTaskIdToUser,
  removeTaskIdfromUser,
} = userSlice.actions;

export default userSlice.reducer;
