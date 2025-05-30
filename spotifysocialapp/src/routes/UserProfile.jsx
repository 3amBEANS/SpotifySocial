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
  const [originalProfile, setOriginalProfile] = useState(null);

  // Setup profile
  const [avatar_url, setAvatarUrl] = useState(null);
  const [display_name, setDisplayName] = useState("");
  const [location, setLocation] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(true);
  const [showTopSongs, setShowTopSongs] = useState(true);
  const [showLikedSongs, setShowLikedSongs] = useState(true);

  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

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
          setLoading(false);
          return;
        }

        setProfileData(data);
        setIsPrivate(!data.isPublic);
      })
      .catch((err) => {
        console.error(err);
        toast({ description: "Failed to load profile", status: "error" });
      })
      .finally(() => {
        if (!isNew) setLoading(false);
      });
  }, [user, toast, isNew]);

  {
    /* fetch user's liked songs */
  }
  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/tracks?limit=5");
        const songs = response.data.items.map((item) => ({
          title: item.track.name,
          artist: item.track.artists.map((artist) => artist.name).join(", "),
          album: item.track.album.name,
          image: item.track.album.images[0]?.url,
        }));
        setLikedSongs(songs);
      } catch (err) {
        console.error("Error fetching liked songs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchLikedSongs();
  }, [user]);

  {
    /* fetch user's top songs */
  }
  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term`
        );
        const songs = response.data.items.map((track) => ({
          title: track.name,
          artist: track.artists.map((artist) => artist.name).join(", "),
          album: track.album.name,
          image: track.album.images[0]?.url,
        }));
        setTopSongs(songs);
      } catch (err) {
        console.error("Error fetching top songs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTopSongs();
  }, [user]);

  {
    /* fetch top artists */
  }
  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term`
        );
        const artists = response.data.items.map((item) => ({
          name: item.name,
          image: item.images[0]?.url,
          genres: item.genres.join(", "),
          id: item.id,
        }));
        setTopArtists(artists);
      } catch (err) {
        console.error("Error fetching top artists:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTopArtists();
  }, [user]);

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
            setIsNew(false);
            window.location.reload();
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
    name: profileData?.display_name ?? profileData?.name ?? "",
    username: profileData?.username,
    bio: profileData?.bio,
    location: profileData?.location,
    joinDate: profileData?.createdAt || "Unknown",
  };

  const handleTogglePrivate = async (checked) => {
    // checked = true means user wants a PRIVATE profile, so isPublic = !checked
    setIsPrivate(checked);

    try {
      const res = await axios.patch(`/api/users/${user.id}`, {
        isPublic: !checked,
      });
      // update our local copy too:
      setProfileData((p) => ({ ...p, isPublic: res.data.isPublic }));
    } catch (err) {
      console.error("Failed to update privacy:", err);
      toast({
        description: "Could not update privacy setting",
        status: "error",
      });
      // roll back the toggle
      setIsPrivate((prev) => !prev);
    }
  };

  const handleEdit = () => {
    // keep a copy of the current profileData so we can restore it
    setOriginalProfile({ ...profileData });
    setIsEditing(true);
  };

  // when user clicks “Cancel”
  const handleCancelEdit = () => {
    // throw away any edits and restore original
    if (originalProfile) {
      setProfileData(originalProfile);
    }
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    try {
      // build only the fields you want to update
      const payload = {
        display_name: profileData.display_name,
        bio: profileData.bio,
      };
      // send it
      const res = await axios.patch(`/api/users/${user.id}`, payload);
      // replace local copy, exit edit mode
      setProfileData(res.data);
      setIsEditing(false);
      toast({ description: "Profile updated!", status: "success" });
    } catch (err) {
      console.error("Save profile failed:", err);
      toast({ description: "Could not save profile", status: "error" });
    }
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
            avatar_url={avatar_url ?? profileData?.avatar_url}
            isEditing={isEditing}
            isPrivate={isPrivate}
            showTopArtists={showTopArtists}
            showTopSongs={showTopSongs}
            showLikedSongs={showLikedSongs}
            onEdit={handleEdit}
            onSave={handleSaveProfile}
            onCancel={handleCancelEdit}
            onProfileChange={(field, val) => setProfileData((pd) => ({ ...pd, [field]: val }))}
            onTogglePrivate={handleTogglePrivate}
            onToggleShowTopArtists={setShowTopArtists}
            onToggleShowTopSongs={setShowTopSongs}
            onToggleShowLikedSongs={setShowLikedSongs}
          />

          {/* music cards */}
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
                <LikedSongsCard data={likedSongs} />
              </GridItem>
            )}
          </Grid>
        </VStack>
      </Box>
    </Box>
  );
}
