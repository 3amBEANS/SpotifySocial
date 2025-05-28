import LibrarySidebar from "../components/LibrarySidebar";
import TopArtistsHeader from "../components/TopXHeader";
import SongList from "../components/SongList";
import { React, useState, useEffect, useContext } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import "../styles/library.css";
import axios from 'axios';
import { AuthContext } from "../AuthContext";

const TopArtists = () => {
  const [view, setView] = useState("all"); // 'all' or 'year' or 'month'
  const { user } = useContext(AuthContext);
  const [topArtists, setTopArtists] = useState({
    all: [],
    year: [],
    month: [],
  });
  const [loading, setLoadingArtists] = useState(true);
  const [error, setArtistError] = useState(null);
  
  {
    /* fetch top artists */
  }
  useEffect(() => {
    const fetchTopArtists = async () => {
      const ranges = {
        all: "long_term",
        year: "medium_term",
        month: "short_term",
      };
      try {
        const results = await Promise.all(
          Object.entries(ranges).map(async ([key, range]) => {
            const response = await axios.get(
              `https://api.spotify.com/v1/me/top/artists?limit=20&time_range=${range}`
            );
            return [key, response.data.items.map(artist => ({
              name: artist.name,
              image: artist.images[0]?.url,
              genres: artist.genres.join(", "),
              id: artist.id,
            }))];
          })
        );
        setTopArtists(Object.fromEntries(results));
      } catch (err) {
        console.error("Error fetching top artists:", err);
        setArtistError("Failed to load top artists.");
      } finally {
        setLoadingArtists(false);
      }
    };
  
    if (user) fetchTopArtists();
  }, [user]);

  if (loading) return <Spinner size="xl" color="green.400" />;
  if (error) return <Text color="white" fontWeight={700} >{error}</Text>;

  return (
    <Flex className="top-artists-page">
      <LibrarySidebar />
      <Box flex="1" p={8} className="content-area">
        <TopArtistsHeader
          view={view}
          setView={setView}
          heading="Top Artists"
          subheading="Your top-listened artists across time."
        />
        <SongList 
          displayedCards={topArtists[view]} 
          type="artist" 
          header={"Your Top Artists of " + (view === 'all' ? "All Time" : view === 'year' ? "the Past Year" : "the Past Month")}
        />
      </Box>
    </Flex>
  );
};

export default TopArtists;
