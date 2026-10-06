//related to domain state
import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { toLocalDateString } from "../../shared/utils/helperFunction";
import type { Task } from "./types";

export const todosAdapter = createEntityAdapter<Task>();

export const todoSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: todosAdapter.addOne,
    removeTodo: todosAdapter.removeOne,

    editTodo: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Task> }>,
    ) => {
      todosAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload.changes,
      });
    },

    onComplete: (state, action: PayloadAction<string>) => {
      todosAdapter.updateOne(state, {
        id: action.payload,
        changes: { status: "completed" },
      });
    },
    undoComplete: (state, action: PayloadAction<string>) => {
      todosAdapter.updateOne(state, {
        id: action.payload,
        changes: { status: "pending" },
      });
    },

    expandTodo: (state, action: PayloadAction<string>) => {
      const todo = state.entities[action.payload];
      if (!todo) return;

      todosAdapter.updateOne(state, {
        id: action.payload,
        changes: { dueDate: toLocalDateString(new Date()) },
      });
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  expandTodo,
  onComplete,
  undoComplete,
} = todoSlice.actions;

export default todoSlice.reducer;
