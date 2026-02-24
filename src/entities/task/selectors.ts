import type { RootState } from "../../store/store";
import { todosAdapter } from "./todoSlice";

// Pre-built selectors
export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state: RootState) => state.todos);
