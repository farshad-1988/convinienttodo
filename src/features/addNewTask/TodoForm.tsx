import DateInputs from "./components/DateInputs";
import ExplainInput from "./components/ExplainInput";
import SubjectInput from "./components/SubjectInput";
import useAddTodo from "./hooks/useAddTodo";

export default function TodoForm() {
  const { handleSubmit, register, errors } = useAddTodo();

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-md mx-auto p-4 sm:p-6 bg-gray-900 border border-gray-700 shadow-xl rounded-xl space-y-4"
    >
      <h1 className="text-lg font-semibold text-gray-100 tracking-tight">
        New task
      </h1>
      <SubjectInput register={register} error={errors.subject?.message} />
      <ExplainInput register={register} error={errors.explain?.message} />
      <DateInputs
        register={register}
        startDateError={errors.startDate?.message}
        dueDateError={errors.dueDate?.message}
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 transition font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
      >
        Add task
      </button>
    </form>
  );
}
