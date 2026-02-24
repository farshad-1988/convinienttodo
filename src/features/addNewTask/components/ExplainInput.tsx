import React from "react";
import { inputClass, labelClass } from "../utils/tailwindClasses";
import type { todoInputProps } from "../types/types";

const ExplainInput = ({ register, error }: todoInputProps) => {
  return (
    <div>
      <label className={labelClass}>Explanation</label>
      <textarea
        {...register("explain", { required: true })}
        placeholder="Describe the task..."
        className={`${inputClass} h-24 resize-none`}
      />
      <p>{error}</p>
    </div>
  );
};

export default ExplainInput;
