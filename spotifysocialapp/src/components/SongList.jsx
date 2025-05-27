// src/components/SongList.jsx
import React from 'react';
import { SimpleGrid, Box, Text, Image } from '@chakra-ui/react';

const SongList = ({ displayedCards, type }) => {
  
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Your Liked Songs</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>


        {displayedCards.map((card, index) => (
          <Box 
            key={index} 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden" 
            bg="white"
          >
            <Image 
              src={
                type === 'song'
                  ? `https://via.placeholder.com/300?text=Album+art+of+${card.title}`
                  : card.image || `https://via.placeholder.com/300?text=Artist+${card.artist}`
              } 
              alt={type === 'song' ? `${card.title} cover` : `${card.artist} photo`}
            />
            <Box p={4}>
            {type === 'song' ? (
                <>
                  <Text fontWeight="semibold" color="black">{card.title}</Text>
                  <Text color="black">{`${card.artist} - ${card.album}`}</Text>
                </>
              ) : (
                <Text fontWeight="semibold" color="black">{card.artist}</Text>
              )}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SongList;