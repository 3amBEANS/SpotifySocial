import LibrarySidebar from '../components/LibrarySidebar';
import TopSongsHeader from '../components/TopXHeader';
import SongList from '../components/SongList';
import { React, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import '../styles/library.css';

const TopSongs = () => {
    const [view, setView] = useState('all'); // 'all' or 'year' or 'month'

    {/* dummy data */}
    const allSongs = [
        { title: 'Song 1', artist: 'Artist 1', album: 'Album 1', likedAt: '2023-10-01' },
        { title: 'Song 2', artist: 'Artist 2', album: 'Album 2', likedAt: '2024-07-10' },
        { title: 'Song 3', artist: 'Artist 3', album: 'Album 3', likedAt: '2025-05-02' },
        { title: 'Song 4', artist: 'Artist 4', album: 'Album 4', likedAt: '2025-04-30' },
        { title: 'Song 5', artist: 'Artist 5', album: 'Album 5', likedAt: '2022-10-01' },
        { title: 'Song 6', artist: 'Artist 6', album: 'Album 6', likedAt: '2023-09-01' }
    ];
    const pastYearSongs = allSongs.filter(song => new Date(song.likedAt) > new Date('2024-05-27'));
    const pastMonthSongs = allSongs.filter(song => new Date(song.likedAt) > new Date('2025-04-27'));

    let displayedSongs;
    if (view === "all") {
        displayedSongs = allSongs;
    } else if (view === "year") {
        displayedSongs = pastYearSongs;
    } else if (view === "month") {
        displayedSongs = pastMonthSongs;
    }

    return (
        <Flex className="top-songs-page">
          <LibrarySidebar />
          <Box flex="1" p={8} className="content-area">
          <TopSongsHeader 
                view={view} 
                setView={setView} 
                heading="Top Songs"
                subheading="Your top-listened songs across time."
            />
            <SongList displayedCards={displayedSongs} type="song" />
          </Box>
        </Flex>
      );
};

export default TopSongs;