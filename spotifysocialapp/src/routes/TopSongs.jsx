import LibrarySidebar from "../components/LibrarySidebar";
import TopSongsHeader from "../components/TopXHeader";
import SongList from "../components/SongList";
import { React, useState, useEffect, useContext } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import "../styles/library.css";
import axios from 'axios';
import { AuthContext } from "../AuthContext";

const TopSongs = () => {
  const [view, setView] = useState("all"); // 'all' or 'year' or 'month'
  const { user } = useContext(AuthContext);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoadingTracks] = useState(true);
  const [error, setTrackError] = useState(null);

  {
    /* fetch user's top tracks */
  }
  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=20");
        const tracks = response.data.items.map(track => ({
          title: track.name,
          artist: track.artists.map(artist => artist.name).join(", "),
          album: track.album.name,
          image: track.album.images[0]?.url,
        }));
        setTopTracks(tracks);
      } catch (err) {
        console.error("Error fetching top tracks:", err);
        setTrackError("Failed to load top songs.");
      } finally {
        setLoadingTracks(false);
      }
    };
  
    if (user) fetchTopTracks();
  }, [user]);

  const pastYearSongs = topTracks.filter((song) => new Date(song.likedAt) > new Date("2024-05-27"));
  const pastMonthSongs = topTracks.filter((song) => new Date(song.likedAt) > new Date("2025-04-27"));

  let displayedSongs;
  if (view === "all") {
    displayedSongs = topTracks;
  } else if (view === "year") {
    displayedSongs = pastYearSongs;
  } else if (view === "month") {
    displayedSongs = pastMonthSongs;
  }

  if (loading) return <Spinner size="xl" color="green.400" />;
  if (error) return <Text color="white" fontWeight={700} >{error}</Text>;

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
