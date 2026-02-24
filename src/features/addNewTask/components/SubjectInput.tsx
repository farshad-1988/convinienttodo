import type { todoInputProps } from "../types/types";
import { inputClass, labelClass } from "../utils/tailwindClasses";

const SubjectInput = ({ register, error }: todoInputProps) => {
  return (
    <div>
      <label className={labelClass}>Subject</label>
      <input
        {...register("subject", { required: true })}
        type="text"
        // onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject..."
        className={inputClass}
      />
      <p>{error}</p>
    </div>
  );
};

export default SubjectInput;
