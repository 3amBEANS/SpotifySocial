import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Box as="main" pt="64px" bg="#0f0e17" minH="100vh">
        <Outlet />
      </Box>
    </>
  );
}
