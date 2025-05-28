import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function LoginCallback() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const expiresIn = parseInt(params.get("expires_in"), 10);

    if (accessToken) {
      login({ accessToken, refreshToken, expiresIn })
        .then(() => navigate("/profile"))
        .catch(() => navigate("/"));
    } else {
      navigate("/");
    }
  }, [login, navigate]);

  return null; // or show a spinner
}
