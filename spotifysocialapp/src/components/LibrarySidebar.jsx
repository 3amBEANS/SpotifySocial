import { useState, useEffect } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Box, Flex, VStack, Text, Button, IconButton, Icon, Divider } from "@chakra-ui/react";
import { FaMusic, FaUser, FaHeart } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";

const navItems = [
  { label: "Liked Songs", icon: FaHeart, to: "/library/liked-songs" },
  { label: "Top Artists", icon: FaUser, to: "/library/top-artists" },
  { label: "Top Songs", icon: FaMusic, to: "/library/top-songs" },
];

export default function LibrarySidebar({ children }) {
  const { pathname } = useLocation();

  // Read initial collapse state from localStorage (default to false)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem("librarySidebarCollapsed");
    return stored === "true";
  });

  // Whenever isCollapsed changes, write it back to localStorage
  useEffect(() => {
    localStorage.setItem("librarySidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  // Widths for the two modes
  const expandedW = "220px";
  const collapsedW = "60px";
  const sidebarWidth = isCollapsed ? collapsedW : expandedW;

  return (
    <Flex>
      {/** Sidebar **/}
      <Box
        as="nav"
        bg="#1b1b1b"
        position="fixed"
        top="0" /* sit under your 64px navbar */
        left="0"
        bottom="0"
        zIndex="2"
        w={sidebarWidth}
        transition="width 0.2s"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={2}
      >
        {/** Title **/}
        <Box>
          <Flex align="center" justify={isCollapsed ? "center" : "flex-start"} px={2} mb={3}>
            {isCollapsed ? (
              <Icon as={IoLibrary} color="white" boxSize={5} marginTop={20} />
            ) : (
              <Text fontWeight="bold" fontSize="lg" color="white" marginTop={20}>
                Library
              </Text>
            )}
          </Flex>

          <Divider />

          {/** Nav Items **/}
          <VStack align={isCollapsed ? "center" : "start"} spacing={4} mt={4}>
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              return isCollapsed ? (
                <IconButton
                  key={item.to}
                  as={RouterLink}
                  to={item.to}
                  icon={<Icon as={item.icon} />}
                  aria-label={item.label}
                  variant="ghost"
                  color={isActive ? "white" : "whiteAlpha.600"}
                  _hover={{ bg: "white", color: "#43b164" }}
                />
              ) : (
                <Button
                  key={item.to}
                  as={RouterLink}
                  to={item.to}
                  leftIcon={<Icon as={item.icon} />}
                  variant="ghost"
                  justifyContent="start"
                  w="100%"
                  fontSize="md"
                  px={2}
                  py={2}
                  borderRadius="md"
                  bg={isActive ? "white" : "transparent"}
                  color={isActive ? "black" : "whiteAlpha.800"}
                  _hover={{
                    bg: "white",
                    color: "#43b164",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </VStack>
        </Box>

        {/** Collapse/Expand Toggle **/}
        <Flex justify={isCollapsed ? "center" : "flex-end"} p={2}>
          <IconButton
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            icon={
              isCollapsed ? (
                <TbLayoutSidebarRightCollapse size="20px" />
              ) : (
                <TbLayoutSidebarLeftCollapse size="20px" />
              )
            }
            variant="ghost"
            color="white"
            onClick={() => setIsCollapsed((c) => !c)}
            _hover={{ bg: "gray.700" }}
          />
        </Flex>
      </Box>

      {/** Main content: automatically offset **/}
      <Box
        as="main"
        flex="1"
        ml={sidebarWidth} /* push content right of sidebar */
        mt="64px" /* push content below navbar */
        p={6}
      >
        {children}
      </Box>
    </Flex>
  );
}