import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TITLES: Record<string, string> = {
  "/": "Convinient Todo",
  "/dashboard": "Your tasks · Convinient Todo",
  "/new-task": "New task · Convinient Todo",
  "/login": "Sign in · Convinient Todo",
  "/register": "Create account · Convinient Todo",
};

const DocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] ?? "Page not found · Convinient Todo";
  }, [pathname]);

  return null;
};

export default DocumentTitle;
