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
      { payload }: PayloadAction<{ taskId: string; userId: string }>,
    ) {
      const user = state.entities[payload.userId];
      if (!user || user.tasks.includes(payload.taskId)) return;
      user.tasks.push(payload.taskId);
    },
    removeTaskIdfromUser(
      state,
      { payload }: PayloadAction<{ taskId: string; userId: string }>,
    ) {
      const user = state.entities[payload.userId];
      if (!user) return;
      user.tasks = user.tasks.filter((id) => id !== payload.taskId);
    },
    loginUser(state, { payload }: PayloadAction<{ id: string }>) {
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
