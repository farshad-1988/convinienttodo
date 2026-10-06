import { inputClass, labelClass } from "../utils/tailwindClasses";
import type { todoInputProps } from "../types/types";

const ExplainInput = ({ register, error }: todoInputProps) => {
  return (
    <div>
      <label htmlFor="task-explain" className={labelClass}>
        Explanation
      </label>
      <textarea
        id="task-explain"
        {...register("explain", { required: true })}
        placeholder="Describe the task..."
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "task-explain-error" : undefined}
        className={`${inputClass} h-24 resize-none`}
      />
      {error && (
        <p id="task-explain-error" className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default ExplainInput;
