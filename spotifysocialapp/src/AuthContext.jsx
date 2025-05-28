import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Call this after you get tokens from the OAuth callback
  const login = async ({ accessToken, refreshToken, expiresIn }) => {
    // persist tokens
    localStorage.setItem("spotify_token", accessToken);
    localStorage.setItem("spotify_refresh", refreshToken);
    localStorage.setItem("spotify_expires", Date.now() + expiresIn * 1000);

    // configure axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // fetch Spotify profile
    const { data } = await axios.get("https://api.spotify.com/v1/me");
    setUser(data);
  };

  const logout = () => {
    // clear persisted tokens
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("spotify_refresh");
    localStorage.removeItem("spotify_expires");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // On mount, if we have a valid token, restore the session
  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    const expires = parseInt(localStorage.getItem("spotify_expires"), 10);
    if (token && expires > Date.now()) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("https://api.spotify.com/v1/me")
        .then((res) => setUser(res.data))
        .catch(logout);
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
