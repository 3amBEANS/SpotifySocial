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

import { Link as RouterLink } from "react-router-dom";
import { React } from 'react';
import { Box, VStack, Icon, Text } from '@chakra-ui/react';
import { FaMusic, FaUser, FaHeart } from 'react-icons/fa';

const LibrarySidebar = ( box ) => {
console.log("VIEW: " + box);
  return (
    <Box bg="#1b1b1b" p={4} minW="200px" height="100vh">
      <VStack align="start" spacing={6}>
        <Text fontWeight="bold" fontSize="lg">Library</Text>
        
        {/* Liked Songs Tab */} 
        <Box as={RouterLink} to="/library/liked-songs" 
          display="flex" 
          alignItems="center"
          p={2}
          borderRadius="md"
          _hover={{
            bg: "gray.100",
            color: "#43b164",
            cursor: "pointer"
          }}
        >
          <Icon as={FaHeart} mr={2} />
          <Text>Liked Songs</Text>
        </Box>
        
        {/* Top Artists Tab */} 
        <Box as={RouterLink} to="/library/top-artists" 
          display="flex" 
          alignItems="center"
          p={2}
          borderRadius="md"
          _hover={{
            bg: "gray.100",
            color: "#43b164",
            cursor: "pointer"
          }}
        >
          <Icon as={FaUser} mr={2} />
          <Text>Top Artists</Text>
        </Box>
        
        {/* Top Songs Tab */} 
        <Box as={RouterLink} to="/library/top-songs"
          display="flex" 
          alignItems="center"
          p={2}
          borderRadius="md"
          _hover={{
            bg: "gray.100",
            color: "#43b164",
            cursor: "pointer"
          }}
        >
          <Icon as={FaMusic} mr={2} />
          <Text>Top Songs</Text>
        </Box>
      </VStack>
    </Box>
  );
}
