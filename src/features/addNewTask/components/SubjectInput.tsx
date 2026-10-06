import type { todoInputProps } from "../types/types";
import { inputClass, labelClass } from "../utils/tailwindClasses";

const SubjectInput = ({ register, error }: todoInputProps) => {
  return (
    <div>
      <label htmlFor="task-subject" className={labelClass}>
        Subject
      </label>
      <input
        id="task-subject"
        {...register("subject", { required: true })}
        type="text"
        autoComplete="off"
        placeholder="Enter subject..."
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "task-subject-error" : undefined}
        className={inputClass}
      />
      {error && (
        <p id="task-subject-error" className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default SubjectInput;
