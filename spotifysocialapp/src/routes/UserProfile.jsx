import { useContext, useEffect, useState } from "react"; // To get user data
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
import { AuthContext } from "../AuthContext"; // To get user data
import { useNavigate } from "react-router-dom";
import axios from "axios"; // To get user data

import ProfileCard from "../components/user_profile/ProfileCard";
import TopArtistsCard from "../components/user_profile/TopArtistsCard";
import TopSongsCard from "../components/user_profile/TopSongsCard";
import LikedSongsCard from "../components/user_profile/LikedSongsCard";
import SetupModal from "../components/user_profile/SetupModal";
import "../styles/userProfile.css";

export default function UserProfile() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  // New vs old user state
  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // Setup profile
  const [avatar_url, setAvatarUrl] = useState(null);
  const [display_name, setDisplayName] = useState("");
  const [location, setLocation] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(true);
  const [showTopSongs, setShowTopSongs] = useState(true);
  const [showLikedSongs, setShowLikedSongs] = useState(true);

  useEffect(() => {
    if (!user) return;
    const id = user.id;
    setLoading(true);

    axios
      .get(`/api/users/${id}`)
      .then((res) => {
        const data = res.data;

        if (!data.isProfileSetup) {
          setIsNew(true);
          setDisplayName(data.spotifyDisplayName || "");
          // stop further loading
          setLoading(false);
          return;
        }

        // existing user, continue with normal flow
        setProfileData(data);
        setIsPrivate(!data.isPublic);
        return axios.get(`/api/users/${id}/top`);
      })
      .then((res) => {
        if (!res) return;

        const { topArtists = [], topSongs = [], likedSongs = [] } = res.data;
        setProfileData((pd) => ({
          ...pd,
          topArtists: topArtists.slice(0, 4),
          topSongs: topSongs.slice(0, 4),
          likedSongs: likedSongs.slice(0, 4),
        }));
      })
      .catch((err) => {
        console.error(err);
        toast({ description: "Failed to load profile", status: "error" });
      })
      .finally(() => {
        // make sure we only hide the spinner once
        if (!isNew) setLoading(false);
      });
  }, [user, toast, isNew]);

  // const [profile, setProfile] = useState({
  //   name: "Alex Rivera",
  //   username: "@alexmusic",
  //   bio: "Music enthusiast | Always discovering new sounds | Currently obsessed with indie rock and electronic beats 🎵",
  //   location: "San Francisco, CA",
  //   joinDate: "June 2023",
  // });

  // const topArtists = [
  //   { name: "Tame Impala", image: "/placeholder.svg?height=80&width=80", followers: "2.1M" },
  //   { name: "Phoebe Bridgers", image: "/placeholder.svg?height=80&width=80", followers: "1.8M" },
  //   { name: "Mac Miller", image: "/placeholder.svg?height=80&width=80", followers: "3.2M" },
  //   { name: "FKA twigs", image: "/placeholder.svg?height=80&width=80", followers: "1.5M" },
  // ];

  // const topSongs = [
  //   { title: "The Less I Know The Better", artist: "Tame Impala", plays: "127" },
  //   { title: "Motion Sickness", artist: "Phoebe Bridgers", plays: "89" },
  //   { title: "Good News", artist: "Mac Miller", plays: "156" },
  //   { title: "Two Weeks", artist: "FKA twigs", plays: "73" },
  // ];
  // On mount: check if user exists, fetch profile + top-4

  if (authLoading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (!user) {
    // not signed in — either redirect to /login or show nothing
    return (
      <Flex h="100vh" align="center" justify="center">
        <Text color="white">Please sign in first.</Text>
      </Flex>
    );
  }

  // Show spinner while loading
  if (loading) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isNew) {
    return (
      <SetupModal
        isOpen={true}
        onClose={() => navigate("/")}
        user={user}
        avatar_url={avatar_url}
        setAvatarUrl={setAvatarUrl}
        display_name={display_name}
        setDisplayName={setDisplayName}
        location={location}
        setLocation={setLocation}
        onConfirm={async () => {
          // your existing POST /setup logic here…
          try {
            const id = user.id;
            const finalAvatar = avatar_url || user.images?.[0]?.url || "";

            await axios.post(`/api/users/${id}/setup`, {
              username: user.display_name.toLowerCase().replace(/\s+/g, "_"),
              createdAt: new Date().toISOString(),
              avatar_url: finalAvatar,
              display_name,
              location,
            });

            // re-fetch profile & hide modal
            const pd = (await axios.get(`/api/users/${id}`)).data;
            const tops = (await axios.get(`/api/users/${id}/top`)).data;
            setProfileData({
              ...pd,
              topArtists: tops.topArtists.slice(0, 4),
              topSongs: tops.topSongs.slice(0, 4),
              likedSongs: tops.likedSongs.slice(0, 4),
            });
            setIsNew(false);
          } catch {
            toast({ description: "Setup failed", status: "error" });
          }
        }}
      />
    );
  }

  // Existing user: show normal profile
  // Prepare the prop shape for ProfileCard
  const cardProfile = {
    name: profileData.display_name ?? profileData.display_name ?? "",
    username: profileData.username,
    bio: profileData.bio,
    location: profileData.location,
    joinDate: profileData.createdAt || "Unknown",
  };

  return (
    <Box className="user-profile-page">
      <Box className="user-profile-container">
        <VStack className="user-profile-stack">
          {/* header */}
          <Flex className="profile-header">
            <Text className="profile-header-title">Profile</Text>
            <HStack className="profile-header-status">
              <Icon as={isPrivate ? ViewOffIcon : ViewIcon} color="white" />
              <Text className="profile-header-status-text">{isPrivate ? "Private" : "Public"}</Text>
            </HStack>
          </Flex>

          {/* profile card */}
          <ProfileCard
            profile={cardProfile}
            avatar_url={avatar_url ?? profileData.avatar_url}
            isEditing={isEditing}
            isPrivate={isPrivate}
            showTopArtists={showTopArtists}
            showTopSongs={showTopSongs}
            showLikedSongs={showLikedSongs}
            onEdit={() => setIsEditing(true)}
            onSave={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
            onProfileChange={(field, val) => setProfileData((pd) => ({ ...pd, [field]: val }))}
            onTogglePrivate={setIsPrivate}
            onToggleShowTopArtists={setShowTopArtists}
            onToggleShowTopSongs={setShowTopSongs}
            onToggleShowLikedSongs={setShowLikedSongs}
          />

          {/* music cards */}
          <Grid className="user-profile-grid">
            {showTopArtists && (
              <GridItem>
                <TopArtistsCard data={profileData.topArtists} />
              </GridItem>
            )}
            {showTopSongs && (
              <GridItem>
                <TopSongsCard data={profileData.topSongs} />
              </GridItem>
            )}
            {showLikedSongs && (
              <GridItem className="liked-songs-item">
                <LikedSongsCard count={profileData.likedSongs.length} />
              </GridItem>
            )}
          </Grid>
        </VStack>
      </Box>
    </Box>
  );
}
