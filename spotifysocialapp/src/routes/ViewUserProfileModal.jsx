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

  const refreshAccessToken = async (refreshToken, userId) => {
    const res = await axios.post("/api/users/spotify/refresh-token", {
      refreshToken,
      userId,
    });
    return res.data.accessToken;
  };

  useEffect(() => {
  const fetchProfileData = async () => {
    setLoading(true);

    try {
      // Step 1: Get user profile from your backend
      const profileRes = await axios.get(`/api/users/${userId}`);
      const { accessToken, refreshToken } = profileRes.data;
      setProfileData(profileRes.data);

      let token = accessToken;

      const getSpotifyData = async (tokenToUse) => {
        const headers = {
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
          },
        };

        return await Promise.all([
          axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", headers),
          axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", headers),
          axios.get("https://api.spotify.com/v1/me/tracks?limit=5", headers),
        ]);
      };

      let artistsRes, songsRes, likedRes;

      try {
        [artistsRes, songsRes, likedRes] = await getSpotifyData(token);
      } catch (err) {
        // Token might be expired — try refreshing
        if (err.response?.status === 401 && refreshToken) {
          token = await refreshAccessToken(refreshToken, userId);

          // Retry with new token
          [artistsRes, songsRes, likedRes] = await getSpotifyData(token);
        } else {
          throw err;
        }
      }

      // Set Top Artists
      const artists = artistsRes.data.items.map((item) => ({
        name: item.name,
        image: item.images[0]?.url,
        genres: item.genres.join(", "),
        id: item.id,
      }));
      setTopArtists(artists);

      // Set Top Songs
      const songs = songsRes.data.items.map((track) => ({
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        image: track.album.images[0]?.url,
      }));
      setTopSongs(songs);

      // Set Liked Songs
      const likedSongsData = likedRes.data.items.map((item) => ({
        title: item.track.name,
        artist: item.track.artists.map((artist) => artist.name).join(", "),
        album: item.track.album.name,
        image: item.track.album.images[0]?.url,
      }));
      setLikedSongs(likedSongsData);

    } catch (err) {
      console.error("Error loading profile data:", err);
      toast({
        title: "Failed to load profile",
        description: err.message,
        status: "error",
        duration: 6000,
        isClosable: true,
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
  bio: profileData?.bio?.trim() ? profileData.bio : "Avid Listener and Promoter of Great Music",
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
            {profileData?.showTopArtists && topArtists.length > 0 && (
              <GridItem>
                <TopArtistsCard data={topArtists} />
              </GridItem>
            )}
            {profileData?.showTopSongs && topSongs.length > 0 && (
              <GridItem>
                <TopSongsCard data={topSongs} />
              </GridItem>
            )}
            {profileData?.showLikedSongs && likedSongs.length > 0 && (
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