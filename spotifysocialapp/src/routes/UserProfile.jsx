import { useState } from "react";
import { Box, Flex, Text, VStack, HStack, Grid, GridItem, Icon } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import ProfileCard from "../components/user_profile/ProfileCard";
import TopArtistsCard from "../components/user_profile/TopArtistsCard";
import TopSongsCard from "../components/user_profile/TopSongsCard";
import LikedSongsCard from "../components/user_profile/LikedSongsCard";
import "../styles/userProfile.css";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(true);
  const [showTopSongs, setShowTopSongs] = useState(true);
  const [showLikedSongs, setShowLikedSongs] = useState(true);

  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    username: "@alexmusic",
    bio: "Music enthusiast | Always discovering new sounds | Currently obsessed with indie rock and electronic beats 🎵",
    location: "San Francisco, CA",
    joinDate: "June 2023",
  });

  const topArtists = [
    { name: "Tame Impala", image: "/placeholder.svg?height=80&width=80", followers: "2.1M" },
    { name: "Phoebe Bridgers", image: "/placeholder.svg?height=80&width=80", followers: "1.8M" },
    { name: "Mac Miller", image: "/placeholder.svg?height=80&width=80", followers: "3.2M" },
    { name: "FKA twigs", image: "/placeholder.svg?height=80&width=80", followers: "1.5M" },
  ];

  const topSongs = [
    { title: "The Less I Know The Better", artist: "Tame Impala", plays: "127" },
    { title: "Motion Sickness", artist: "Phoebe Bridgers", plays: "89" },
    { title: "Good News", artist: "Mac Miller", plays: "156" },
    { title: "Two Weeks", artist: "FKA twigs", plays: "73" },
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Box className="user-profile-page">
      <Box className="user-profile-container">
        <VStack className="user-profile-stack">
          {/* Header */}
          <Flex className="profile-header">
            <Text className="profile-header-title">Profile</Text>
            <HStack className="profile-header-status">
              <Icon as={isPrivate ? ViewOffIcon : ViewIcon} color="white" />
              <Text className="profile-header-status-text">{isPrivate ? "Private" : "Public"}</Text>
            </HStack>
          </Flex>

          {/* Main Profile Card */}
          <ProfileCard
            profile={profile}
            isEditing={isEditing}
            isPrivate={isPrivate}
            showTopArtists={showTopArtists}
            showTopSongs={showTopSongs}
            showLikedSongs={showLikedSongs}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={handleCancel}
            onProfileChange={(field, val) => setProfile((p) => ({ ...p, [field]: val }))}
            onTogglePrivate={setIsPrivate}
            onToggleShowTopArtists={setShowTopArtists}
            onToggleShowTopSongs={setShowTopSongs}
            onToggleShowLikedSongs={setShowLikedSongs}
          />

          {/* Music Content */}
          <Grid className="user-profile-grid">
            {showTopArtists && (
              <GridItem>
                <TopArtistsCard data={topArtists} />
              </GridItem>
            )}

            {showTopSongs && (
              <GridItem>
                <TopSongsCard data={topSongs} />
              </GridItem>
            )}

            {showLikedSongs && (
              <GridItem className="liked-songs-item">
                <LikedSongsCard count={247} />
              </GridItem>
            )}
          </Grid>
        </VStack>
      </Box>
    </Box>
  );
}
