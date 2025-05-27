import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./routes/LoginPage";
import UserProfile from "./routes/UserProfile";
import Forum from "./routes/Forum";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  {
    element: <App />,
    children: [
      { path: "profile", element: <UserProfile /> },
      { path: "forum", element: <Forum /> },
    ],
  },
]);
