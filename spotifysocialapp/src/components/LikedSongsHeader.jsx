import React from 'react';
import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react';

const LibraryHeader = () => {
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
      
    </Box>
  );
};

export default LibraryHeader;
