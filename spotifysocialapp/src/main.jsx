import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { router } from "./Router";
import "./styles/index.css";

import axios from "axios";
axios.defaults.baseURL = "https://test-spotify-site.local:5050";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
