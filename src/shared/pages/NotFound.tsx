import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-3 px-4">
      <h1 className="text-3xl font-semibold text-slate-100">Page not found</h1>
      <p className="text-sm text-slate-400 max-w-sm">
        That address does not match a page in Convinient Todo.
      </p>
      <Link
        to="/"
        className="text-sm text-emerald-400 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
      >
        Back home
      </Link>
    </section>
  );
};

export default NotFound;
