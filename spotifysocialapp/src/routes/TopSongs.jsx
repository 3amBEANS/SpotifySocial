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
  const [topTracks, setTopTracks] = useState({
    all: [],
    year: [],
    month: [],
  });
  const [loading, setLoadingTracks] = useState(true);
  const [error, setTrackError] = useState(null);

  {
    /* fetch user's top tracks */
  }
  useEffect(() => {
    const fetchTopTracks = async () => {
      const ranges = {
        all: "long_term",
        year: "medium_term",
        month: "short_term",
      };
      try {
        const results = await Promise.all(
          Object.entries(ranges).map(async ([key, range]) => {
            const response = await axios.get(
              `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${range}`
            );
            return [key, response.data.items.map(track => ({
              title: track.name,
              artist: track.artists.map(artist => artist.name).join(", "),
              album: track.album.name,
              image: track.album.images[0]?.url,
              id: track.id
            }))];
          })
        );
        setTopTracks(Object.fromEntries(results));
      } catch (err) {
        console.error("Error fetching top tracks:", err);
        setTrackError("Failed to load top songs.");
      } finally {
        setLoadingTracks(false);
      }
    };
  
    if (user) fetchTopTracks();
  }, [user]);

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
        <SongList 
          displayedCards={topTracks[view]} 
          type="song" 
          header={"Your Top Songs of " + (view === 'all' ? "All Time" : view === 'year' ? "the Past Year" : "the Past Month")}
        />
      </Box>
    </Flex>
  );
};

export default TopSongs;
