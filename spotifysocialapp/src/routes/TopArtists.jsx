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
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoadingArtists] = useState(true);
  const [error, setArtistError] = useState(null);
  
  {
    /* fetch top artists */
  }
  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=20");
        const artists = response.data.items.map(artist => ({
          name: artist.name,
          image: artist.images[0]?.url,
          genres: artist.genres.join(", "),
        }));
        setTopArtists(artists);
      } catch (err) {
        console.error("Error fetching top artists:", err);
        setArtistError("Failed to load top artists.");
      } finally {
        setLoadingArtists(false);
      }
    };
  
    if (user) fetchTopArtists();
  }, [user]);
  
  const pastYearSongs = topArtists.filter((song) => new Date(song.likedAt) > new Date("2024-05-27"));
  const pastMonthSongs = topArtists.filter((song) => new Date(song.likedAt) > new Date("2025-04-27"));

  let displayedSongs;
  if (view === "all") {
    displayedSongs = topArtists;
  } else if (view === "year") {
    displayedSongs = pastYearSongs;
  } else if (view === "month") {
    displayedSongs = pastMonthSongs;
  }

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
        <SongList displayedCards={displayedSongs} type="artist" />
      </Box>
    </Flex>
  );
};

export default TopArtists;
