import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
