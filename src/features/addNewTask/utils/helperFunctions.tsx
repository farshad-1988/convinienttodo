import { toLocalDateString } from "../../../shared/utils/helperFunction";

export const getDefaults = () => {
  const now = new Date();
  // Create a copy of 'now' to avoid mutating the original date
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  return {
    startDate: toLocalDateString(now),
    dueDate: toLocalDateString(tomorrow),
  };
};
