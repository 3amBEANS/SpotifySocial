import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserProfile from "./routes/UserProfile";
import Forum from "./routes/Forum";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/forum", element: <Forum /> },
  { path: "/profile", element: <UserProfile /> },
]);
