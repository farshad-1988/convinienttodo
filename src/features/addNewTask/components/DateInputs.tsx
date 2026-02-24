import React from "react";
import { inputClass, labelClass } from "../utils/tailwindClasses";
import type { todoInputProps } from "../types/types";

const DateInputs = ({ register }: Partial<todoInputProps>) => {
  if (!register) throw new Error("register is not defined !!!");
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className={labelClass}>Start Date</label>
        <input
          type="date"
          {...register("startDate", { required: true })}
          className={`${inputClass} [color-scheme:dark]`}
        />
      </div>
      <div>
        <label className={labelClass}>Due Date</label>
        <input
          type="date"
          {...register("dueDate", { required: true })}
          className={`${inputClass} [color-scheme:dark]`}
        />
      </div>
    </div>
  );
};

export default DateInputs;
