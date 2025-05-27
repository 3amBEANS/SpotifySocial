// src/pages/LikedSongs.jsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import LibrarySidebar from '../components/LibrarySidebar';
import LikedSongsHeader from '../components/LikedSongsHeader';
import SongList from '../components/SongList';
import '../styles/library.css';

const LikedSongs = () => {
  return (
    <Flex className="liked-songs-page">
      <LibrarySidebar />
      <Box flex="1" p={8} className="content-area">
        <LikedSongsHeader />
        <SongList />
      </Box>
    </Flex>
  );
};

export default LikedSongs;