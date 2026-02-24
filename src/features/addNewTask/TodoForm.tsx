"use client";

import DateInputs from "./components/DateInputs";
import ExplainInput from "./components/ExplainInput";
import SubjectInput from "./components/SubjectInput";
import useAddTodo from "./hooks/useAddTodo";

export default function TodoForm() {
  const { handleSubmit, register, errors } = useAddTodo();

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-900 border border-gray-700 shadow-xl rounded-xl space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-100 tracking-tight">
        New Todo
      </h2>
      <SubjectInput register={register} error={errors.subject?.message ?? ""} />
      <ExplainInput register={register} error={errors.explain?.message ?? ""} />
      <DateInputs register={register} />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 transition font-medium tracking-wide"
      >
        Add Todo
      </button>
    </form>
  );
}
