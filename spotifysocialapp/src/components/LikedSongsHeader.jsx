import React from 'react';
import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react';

const LibraryHeader = ({ view, setView }) => {
  return (
    <Box textAlign="center" mb={10}>
      <Heading mb={2}>Liked Songs</Heading>
      <Text mb={4}>A collection of your favorite tracks.</Text>

      {/* Create Playlist Button */} 
      <Button 
        colorScheme="green" 
        variant="solid" 
        mb={6}
        _hover={{
          bg: "gray.100",
          color: "black",
          cursor: "pointer"
        }}
      >
        Create Playlist
      </Button>
      <HStack justify="center">

        {/* Sorted Alpha Button */} 
        <Button 
          variant={view === "all" ? "solid" : "outline"}
          onClick={() => setView("all")} 
          colorScheme="white"
          color={view === "all" ? "black" : "white"}
          bg={view === "all" ? "white" : "black"}
          _hover={{
            bg: "gray.100",
            color: "black",
            cursor: "pointer"
          }}
        >
          All Songs
        </Button>
        
        {/* Sorted Recent Button */} 
        <Button 
          variant={view === "recent" ? "solid" : "outline"}
          onClick={() => setView("recent")} 
          colorScheme="white"
          color={view === "recent" ? "black" : "white"}
          bg={view === "recent" ? "white" : "black"}
          _hover={{
            bg: "gray.100",
            color: "black",
            cursor: "pointer"
          }}
        >
          Recent Likes
        </Button>
      </HStack>
    </Box>
  );
};

export default LibraryHeader;
