import { inputClass, labelClass } from "../utils/tailwindClasses";
import type { dateInputProps } from "../types/types";

const DateInputs = ({ register, startDateError, dueDateError }: dateInputProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label htmlFor="task-start-date" className={labelClass}>
          Start Date
        </label>
        <input
          id="task-start-date"
          type="date"
          {...register("startDate", { required: true })}
          aria-invalid={startDateError ? true : undefined}
          aria-describedby={startDateError ? "task-start-date-error" : undefined}
          className={`${inputClass} [color-scheme:dark]`}
        />
        {startDateError && (
          <p
            id="task-start-date-error"
            className="mt-1 text-xs text-red-400"
            role="alert"
          >
            {startDateError}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="task-due-date" className={labelClass}>
          Due Date
        </label>
        <input
          id="task-due-date"
          type="date"
          {...register("dueDate", { required: true })}
          aria-invalid={dueDateError ? true : undefined}
          aria-describedby={dueDateError ? "task-due-date-error" : undefined}
          className={`${inputClass} [color-scheme:dark]`}
        />
        {dueDateError && (
          <p id="task-due-date-error" className="mt-1 text-xs text-red-400" role="alert">
            {dueDateError}
          </p>
        )}
      </div>
    </div>
  );
};

export default DateInputs;
