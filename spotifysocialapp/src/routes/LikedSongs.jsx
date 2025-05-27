import { React, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import LibrarySidebar from '../components/LibrarySidebar';
import LikedSongsHeader from '../components/LikedSongsHeader';
import SongList from '../components/SongList';
import '../styles/library.css';

const LikedSongs = () => {
  const [view, setView] = useState('all'); // 'all' or 'recent'

  {/* dummy data */}
  const allSongs = [
    { title: 'Song 1', artist: 'Artist 1', album: 'Album 1', likedAt: '2023-10-01' },
    { title: 'Song 2', artist: 'Artist 2', album: 'Album 2', likedAt: '2024-04-10' },
    { title: 'Song 3', artist: 'Artist 3', album: 'Album 3', likedAt: '2025-10-01' },
    { title: 'Song 4', artist: 'Artist 4', album: 'Album 4', likedAt: '2026-10-01' },
    { title: 'Song 5', artist: 'Artist 5', album: 'Album 5', likedAt: '2022-10-01' },
    { title: 'Song 6', artist: 'Artist 6', album: 'Album 6', likedAt: '2023-09-01' }
  ];
  const recentSongs = allSongs.filter(song => new Date(song.likedAt) > new Date('2024-01-01'));
  const displayedSongs = view === 'all' ? allSongs : recentSongs;

  return (
    <Flex className="liked-songs-page">
      <LibrarySidebar />
      <Box flex="1" p={8} className="content-area">
        <LikedSongsHeader view={view} setView={setView} />
        <SongList displayedCards={displayedSongs} type="song" />
      </Box>
    </Flex>
  );
};

export default LikedSongs;