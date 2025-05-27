import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./routes/LoginPage";
import UserProfile from "./routes/UserProfile";
import Discover from "./routes/Discover";
import Library from "./routes/Library";
import Forum from "./routes/Forum";
import Inbox from "./routes/Inbox";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  {
    element: <App />,
    children: [
      { path: "profile", element: <UserProfile /> },
      { path: "discover", element: <Discover /> },
      { path: "library", element: <Library /> },
      { path: "forum", element: <Forum /> },
      { path: "inbox", element: <Inbox /> }
    ],
  },
]);
