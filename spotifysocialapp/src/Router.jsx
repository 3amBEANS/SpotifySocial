import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import HomePage from "./routes/HomePage";
import LoginCallback from "./routes/LoginCallback.jsx";
import UserProfile from "./routes/UserProfile";
import Discover from "./routes/Discover";
import Library from "./routes/Library";
import LikedSongs from "./routes/LikedSongs";
import TopArtists from "./routes/TopArtists.jsx";
import TopSongs from "./routes/TopSongs.jsx";
import Forum from "./routes/Forum";
import ForumPost from "./routes/ForumPost";
import Inbox from "./routes/Inbox";
import MessagePage from "./routes/MessagePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // index route: when someone visits "/"", load HomePage
      { index: true, element: <HomePage /> },

      { path: "profile", element: <UserProfile /> },
      { path: "discover", element: <Discover /> },
      { path: "library", element: <Library /> },
      { path: "library/liked-songs", element: <LikedSongs /> },
      { path: "library/top-artists", element: <TopArtists /> },
      { path: "library/top-songs", element: <TopSongs /> },
      { path: "forum", element: <Forum /> },
      { path: "forum/:id", element: <ForumPost /> },
      { path: "inbox", element: <Inbox /> },
      { path: "message", element: <MessagePage /> },
     
     
      
    ],
  },
  { path: "login/callback", element: <LoginCallback /> },
]);
