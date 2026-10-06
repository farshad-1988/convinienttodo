import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./shared/layout/Navbar";
import NotFound from "./shared/pages/NotFound";
import Home from "./features/home/Home";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Tasks from "./features/tasks/Tasks";
import TodoForm from "./features/addNewTask/TodoForm";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import {
  RedirectIfAuthenticated,
  RequireAuth,
} from "./shared/components/RequireAuth";
import DocumentTitle from "./shared/layout/DocumentTitle";

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <p className="p-6 text-sm text-slate-400" role="status">
            Loading…
          </p>
        }
        persistor={persistor}
      >
        <Router>
          <DocumentTitle />
          <div className="max-w-3xl mx-auto p-4">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-slate-800 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Tasks />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/new-task"
                  element={
                    <RequireAuth>
                      <TodoForm />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <>
                      <RedirectIfAuthenticated />
                      <Register />
                    </>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <>
                      <RedirectIfAuthenticated />
                      <Login />
                    </>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
