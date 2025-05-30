import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Icon,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ViewProfileCard from "../components/user_profile/ViewProfileCard";
import TopArtistsCard from "../components/user_profile/TopArtistsCard";
import TopSongsCard from "../components/user_profile/TopSongsCard";
import LikedSongsCard from "../components/user_profile/LikedSongsCard";
import "../styles/userProfile.css";

export default function ViewUserProfileModal({ userId, onClose }) {
  const toast = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [profileRes, artistsRes, songsRes, likedRes] = await Promise.all([
          axios.get(`/api/users/${userId}`),
          axios.get(`https://api.spotify.com/v1/me/top/artists?limit=5`),
          axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=5`),
          axios.get(`https://api.spotify.com/v1/me/tracks?limit=5`),
        ]);
        
        setProfileData(profileRes.data);
        
        // Process top artists
        const artists = artistsRes.data.items.map((item) => ({
          name: item.name,
          image: item.images[0]?.url,
          genres: item.genres.join(", "),
          id: item.id,
        }));
        setTopArtists(artists);
        
        // Process top songs
        const songs = songsRes.data.items.map((track) => ({
          title: track.name,
          artist: track.artists.map((artist) => artist.name).join(", "),
          album: track.album.name,
          image: track.album.images[0]?.url,
        }));
        setTopSongs(songs);
        
        // Process liked songs
        const likedSongsData = likedRes.data.items.map((item) => ({
          title: item.track.name,
          artist: item.track.artists.map((artist) => artist.name).join(", "),
          album: item.track.album.name,
          image: item.track.album.images[0]?.url,
        }));
        setLikedSongs(likedSongsData);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        toast({ 
          title: "Error", 
          description: "Could not load profile data", 
          status: "error" 
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId, toast]);

  if (loading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!profileData) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Text color="white">Profile not found</Text>
      </Flex>
    );
  }

  // Prepare the prop shape for ProfileCard
  const cardProfile = {
    name: profileData?.display_name ?? profileData?.name ?? "",
    username: profileData?.username,
    bio: profileData?.bio,
    location: profileData?.location,
    joinDate: profileData?.createdAt || "Unknown",
  };

  return (
    <Box className="user-profile-page">
      <Box className="user-profile-container">
        <VStack className="user-profile-stack">
          {/* header */}
          <Flex className="profile-header">
            <Text className="profile-header-title">User Profile</Text>
            <HStack className="profile-header-status">
              <Icon as={profileData.isPublic ? ViewIcon : ViewOffIcon} color="white" />
              <Text className="profile-header-status-text">
                {profileData.isPublic ? "Public" : "Private"}
              </Text>
            </HStack>
          </Flex>

          {/* profile card */}
          <ViewProfileCard
            profile={cardProfile}
            avatar_url={profileData?.avatar_url}
            isEditing={false}
            isPrivate={!profileData.isPublic}
            showTopArtists={true}
            showTopSongs={true}
            showLikedSongs={true}
          />

          {/* music cards */}
          <Grid className="user-profile-grid">
            {topArtists.length > 0 && (
              <GridItem>
                <TopArtistsCard data={topArtists} />
              </GridItem>
            )}
            {topSongs.length > 0 && (
              <GridItem>
                <TopSongsCard data={topSongs} />
              </GridItem>
            )}
            {likedSongs.length > 0 && (
              <GridItem className="liked-songs-item">
                <LikedSongsCard data={likedSongs} />
              </GridItem>
            )}
          </Grid>
        </VStack>
      </Box>
    </Box>
  );
}