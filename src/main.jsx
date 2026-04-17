import ReactDOM from "react-dom/client";
import AppShell from "./AppShell";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppErrorBoundary>
    <AppShell />
  </AppErrorBoundary>,
);
