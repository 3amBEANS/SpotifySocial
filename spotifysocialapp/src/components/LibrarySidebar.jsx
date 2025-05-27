import { Link as RouterLink } from "react-router-dom";
import React from 'react';
import { Box, VStack, Icon, Text } from '@chakra-ui/react';
import { FaMusic, FaUser, FaList, FaHeart } from 'react-icons/fa';

const LibrarySidebar = () => {
  return (
    <Box bg="#43b164" p={4} minW="200px" height="100vh">
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
        
        {/* Playlists Tab (STRETCH) */} 
        <Box 
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
          <Icon as={FaList} mr={2} />
          <Text>Playlists</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default LibrarySidebar;
