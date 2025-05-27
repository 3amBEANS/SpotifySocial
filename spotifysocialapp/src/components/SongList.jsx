// src/components/SongList.jsx
import React from 'react';
import { SimpleGrid, Box, Text, Image } from '@chakra-ui/react';

const dummySongs = [
  { title: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
  { title: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
  { title: 'Song 3', artist: 'Artist 3', album: 'Album 3' },
  { title: 'Song 4', artist: 'Artist 4', album: 'Album 4' },
  { title: 'Song 5', artist: 'Artist 5', album: 'Album 5' },
  { title: 'Song 6', artist: 'Artist 6', album: 'Album 6' }
];

const LibrarySongList = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Your Liked Songs</Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {dummySongs.map((song, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
            <Image src={`https://via.placeholder.com/300?text=Album+art+of+${song.title}`} alt={`${song.title} cover`} />
            <Box p={4}>
              <Text fontWeight="semibold" color="black">{song.title}</Text>
              <Text color="black">{`${song.artist} - ${song.album}`}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default LibrarySongList;