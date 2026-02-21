// import { createSlice } from "@reduxjs/toolkit";
// import { toLocalDateString } from "../utils/helperFunctions";

// const initialState = {
//   todos: [],
// };

// export const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       state.todos.push(action.payload);
//     },
//     removeTodo: (state, action) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload);
//     },
//     editTodo: (state, action) => {
//       const { id, updatedData } = action.payload;
//       const index = state.todos.findIndex((todo) => todo.id === id);
//       if (index !== -1) {
//         state.todos[index] = { ...state.todos[index], ...updatedData };
//       }
//     },
//     onComplete: (state, action) => {
//       const id = action.payload;
//       const index = state.todos.findIndex((todo) => todo.id === id);
//       if (index !== -1) {
//         state.todos[index].status = "completed";
//       }
//     },
//     expandTodo: (state, action) => {
//       const id = action.payload;
//       const index = state.todos.findIndex((todo) => todo.id === id);
//       if (index !== -1) {
//         const tomorrow = new Date(state.todos[index].dueDate);
//         const now = new Date();
//         tomorrow.setDate(now.getDate() + 1);
//         state.todos[index].dueDate = toLocalDateString(tomorrow);
//       }
//     },
//   },
// });

// export const { addTodo, removeTodo, editTodo, expandTodo, onComplete } =
//   todoSlice.actions;

// export default todoSlice.reducer;
import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { toLocalDateString } from "../utils/helperFunctions";
import type { RootState } from "../store/store";
import type { Task } from "../types/types";

const todosAdapter = createEntityAdapter<Task>();

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

    expandTodo: (state, action: PayloadAction<string>) => {
      const todo = state.entities[action.payload];
      if (!todo) return;

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      todosAdapter.updateOne(state, {
        id: action.payload,
        changes: { dueDate: toLocalDateString(tomorrow) },
      });
    },
  },
});

export const { addTodo, removeTodo, editTodo, expandTodo, onComplete } =
  todoSlice.actions;

// Pre-built selectors
export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state: RootState) => state.todos);

export default todoSlice.reducer;
