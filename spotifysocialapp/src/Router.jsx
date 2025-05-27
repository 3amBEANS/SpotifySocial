import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./routes/LoginPage";
import UserProfile from "./routes/UserProfile";
import UserLikedSongs from "./routes/UserLikedSongs";
import UserTopArtists from "./routes/UserTopArtists";
import UserTopSongs from "./routes/UserTopSongs";
import Discover from "./routes/Discover";
import Library from "./routes/Library";
import Forum from "./routes/Forum";
import Inbox from "./routes/Inbox";
import ForumPost from "./routes/ForumPost";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  {
    element: <App />,
    children: [
      { path: "profile", element: <UserProfile /> },
      { path: "userlikedsongs", element: <UserLikedSongs /> },
      { path: "usertopartists", element: <UserTopArtists /> },
      { path: "usertopsongs", element: <UserTopSongs /> },
      { path: "discover", element: <Discover /> },
      { path: "library", element: <Library /> },
      { path: "forum", element: <Forum /> },
      { path: "forum/:id", element: <ForumPost /> },
      { path: "inbox", element: <Inbox /> },
    ],
  },
]);
