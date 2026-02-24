import type { RootState } from "../../store/store";
import { usersAdaptor } from "./userSlice";

// Pre-built selectors
export const { selectAll: selectAllUsers } = usersAdaptor.getSelectors(
  (state: RootState) => state.users,
);
