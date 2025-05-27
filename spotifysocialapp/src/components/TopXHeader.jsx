import React from 'react';
import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react';

const TopXHeader = ({ view, setView, heading, subheading }) => {
  return (
    <Box textAlign="center" mb={10}>
      <Heading mb={2}>{heading}</Heading>
      <Text mb={4}>{subheading}</Text>

      <HStack justify="center">

        {/* Top All Time Button */} 
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
          All Time
        </Button>
        
        {/* Top Past Year Button */} 
        <Button 
          variant={view === "year" ? "solid" : "outline"}
          onClick={() => setView("year")} 
          colorScheme="white"
          color={view === "year" ? "black" : "white"}
          bg={view === "year" ? "white" : "black"}
          _hover={{
            bg: "gray.100",
            color: "black",
            cursor: "pointer"
          }}
        >
          Past Year
        </Button>

        {/* Top Past Month Button */} 
        <Button 
          variant={view === "month" ? "solid" : "outline"}
          onClick={() => setView("month")} 
          colorScheme="white"
          color={view === "month" ? "black" : "white"}
          bg={view === "month" ? "white" : "black"}
          _hover={{
            bg: "gray.100",
            color: "black",
            cursor: "pointer"
          }}
        >
          Past Month
        </Button>
      </HStack>
    </Box>
  );
};

export default TopXHeader;
