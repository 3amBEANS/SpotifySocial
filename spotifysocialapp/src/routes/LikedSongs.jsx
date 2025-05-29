import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from '../AuthContext';
import { Box, Flex, Spinner, Text, Heading } from "@chakra-ui/react";
import LibrarySidebar from "../components/LibrarySidebar";
import SongList from "../components/SongList";
import "../styles/library.css";
import axios from 'axios';

const LikedSongs = () => {
  const { user } = useContext(AuthContext);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/tracks?limit=50");
        const songs = response.data.items.map(item => ({
          title: item.track.name,
          artist: item.track.artists.map(artist => artist.name).join(", "),
          album: item.track.album.name,
          image: item.track.album.images[0]?.url,
        }));
        setLikedSongs(songs);
      } catch (err) {
        console.error("Error fetching liked songs:", err);
        setError("Failed to load liked songs.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchLikedSongs();
  }, [user]);

  if (loading) return <Spinner size="xl" color="green.400" />;
  if (error) return <Text color="white" fontWeight={700} >{error}</Text>;

  return (
    <Flex className="liked-songs-page">
      <LibrarySidebar />
      <Box flex="1" p={8} className="content-area">
        {/* Liked Songs Header */}
        <Box textAlign="center" mb={10}>
        <Heading mb={2}>Liked Songs</Heading>
        <Text mb={4}>A collection of your favorite tracks.</Text>
        </Box>
        {/* Song List */}
        <SongList displayedCards={likedSongs} type="song" header="Your Recently Liked Songs" />
      </Box>
    </Flex>
  );
};

export default LikedSongs;
