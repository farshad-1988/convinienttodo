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

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="max-w-3xl mx-auto p-4">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Tasks />} />
              {/* <Route path="/tasks" element={<Tasks />} /> */}
              <Route path="/new-task" element={<TodoForm />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
