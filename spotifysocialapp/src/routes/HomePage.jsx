import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AspectRatio,
  Box,
  Flex,
  Text,
  Button,
  Card,
  CardBody,
  VStack,
  Grid,
  Icon,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FaMusic, FaUsers, FaHeart, FaPlay, FaArrowRight } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { AuthContext } from "../AuthContext";
import * as artistImages from "../assets/artists";
import LoginModal from "../components/LoginModal";
import "../styles/homePage.css";

export default function HomePage() {
  // Mock data
  const featuredTracks = [
    {
      id: 1,
      embedSrc: "https://open.spotify.com/embed/track/2CGNAOSuO1MEFCbBRgUzjd?utm_source=generator",
      link: "https://open.spotify.com/track/2CGNAOSuO1MEFCbBRgUzjd",
    },
    {
      id: 2,
      embedSrc: "https://open.spotify.com/embed/track/2u9S9JJ6hTZS3Vf22HOZKg?utm_source=generator",
      link: "https://open.spotify.com/track/2u9S9JJ6hTZS3Vf22HOZKg",
    },
    {
      id: 3,
      embedSrc: "https://open.spotify.com/embed/track/1Es7AUAhQvapIcoh3qMKDL?utm_source=generator",
      link: "https://open.spotify.com/track/1Es7AUAhQvapIcoh3qMKDL",
    },
  ];

  const featuredArtists = [
    {
      id: 1,
      embedSrc: "https://open.spotify.com/embed/artist/6eUKZXaKkcviH0Ku9w2n3V?utm_source=generator",
      link: "https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V",
    },
    {
      id: 2,
      embedSrc: "https://open.spotify.com/embed/artist/6qqNVTkY8uBg9cP3Jd7DAH?utm_source=generator",
      link: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",
    },
    {
      id: 3,
      embedSrc: "https://open.spotify.com/embed/artist/1HY2Jd0NmPuamShAr6KMms?utm_source=generator",
      link: "https://open.spotify.com/artist/1HY2Jd0NmPuamShAr6KMms",
    },
  ];

  const quickNavItems = [
    {
      label: "User Profile",
      icon: FaUsers,
      link: "/profile",
      description: "View and edit your profile settings",
    },
    {
      label: "Liked Songs",
      icon: FaHeart,
      link: "/library/liked-songs",
      description: "Your collection of favorite tracks",
    },
    {
      label: "Top Artists",
      icon: FaMusic,
      link: "/library/top-artists",
      description: "Your most played artists",
    },
    {
      label: "Top Songs",
      icon: FaArrowTrendUp,
      link: "/library/top-songs",
      description: "Your most played tracks",
    },
  ];

  const navigate = useNavigate();
  const images = Object.values(artistImages);
  const { user } = useContext(AuthContext);
  const [profileSetup, setProfileSetup] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setProfileSetup(false);
      return;
    }
    axios
      .get(`/api/users/${user.id}`)
      .then((res) => setProfileSetup(res.data.isProfileSetup))
      .catch(() => setProfileSetup(false));
  }, [user]);

  // If profile is setup, go to path, otherwise show login modal
  const handleProtectedNav = (path) => {
    if (profileSetup) {
      navigate(path);
    } else {
      setLoginOpen(true);
    }
  };

  const localFilmArtists = images.map((src, idx) => ({
    id: idx + 1,
    imageUrl: src,
  }));

  const filmArtists = [...localFilmArtists, ...localFilmArtists];

  return (
    <>
      <Box className="hero">
        <Flex className="hero-slider">
          {filmArtists.map((artist, i) => (
            <AspectRatio key={i} className="hero-slide">
              <Box bg="gray.800">
                <Image src={artist.imageUrl} alt="" objectFit="cover" w="100%" h="100%" />
              </Box>
            </AspectRatio>
          ))}
        </Flex>

        <Box className="hero-overlay" />

        <Container className="hero-content">
          <Heading className="hero-heading">Welcome to Spotify Connect</Heading>
          <Text className="hero-text">
            Engage with your favorite tracks and connect with other music lovers. Discover new
            sounds, share your taste, and join the conversation.
          </Text>
          <Button
            className="hero-button"
            rightIcon={<Icon as={FaArrowRight} />}
            onClick={() => handleProtectedNav("/profile")}
          >
            Explore Your Profile
          </Button>
        </Container>
      </Box>

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />

      <Container className="main-container">
        <VStack spacing={16} align="stretch">
          <Divider className="section-divider" />

          {/* Your Liked Songs Section */}
          <Box>
            <VStack className="section">
              <Heading className="section-title">Your Liked Songs</Heading>
              <Text className="section-subtitle">
                View up to 50 of your most recently-liked tracks. Click “My Liked Songs” to see your
                full collection.
              </Text>
              <Button
                className="section-button"
                leftIcon={<Icon as={FaPlay} color="white" boxSize="3.5" m="1" />}
                onClick={() => handleProtectedNav("/library/liked-songs")}
              >
                My Liked Songs
              </Button>
            </VStack>

            <SimpleGrid className="grid-3col">
              {featuredTracks.map((track) => (
                <Card key={track.id} href={track.link} className="card-link">
                  <CardBody className="card-body">
                    <AspectRatio ratio={4 / 2.32} w="100%" overflow="hidden">
                      <iframe
                        style={{ borderRadius: 20 }}
                        src={track.embedSrc}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    </AspectRatio>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          <Divider className="section-divider" />

          {/* Top Artists Section */}
          <Box>
            <VStack className="section">
              <Heading className="section-title">Your Top Artists</Heading>
              <Text className="section-subtitle">
                See up to 50 of the artists you listen to most. Click “My Top Artists” to browse
                your full list.
              </Text>
              <Button
                className="section-button"
                leftIcon={<Icon as={FaUsers} color="white" boxSize="5" m="1" />}
                onClick={() => handleProtectedNav("/library/top-artists")}
              >
                My Top Artists
              </Button>
            </VStack>

            <SimpleGrid className="grid-3col">
              {featuredArtists.map((artist) => (
                <Card key={artist.id} href={artist.link} className="card-link">
                  <CardBody className="card-body">
                    <iframe
                      src={artist.embedSrc}
                      width="100%"
                      height="352"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      style={{ display: "block", borderRadius: 20 }}
                    />
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          <Divider className="section-divider" />

          {/* Quick Navigation Cards */}
          <Box>
            <VStack className="section">
              <Heading className="section-title">Quick Access</Heading>
              <Text>Jump to your favorite sections</Text>
            </VStack>
            <Grid className="quick-grid">
              {quickNavItems.map((item) => (
                <Card
                  key={item.label}
                  className="quick-grid_card-link"
                  onClick={() => handleProtectedNav(item.link)}
                >
                  <CardBody>
                    <VStack className="quick-grid_vstack" k>
                      <Box className="quick-grid_iconwrapper">
                        <Icon as={item.icon} color="white" boxSize={9} mb={3} />
                      </Box>
                      <Text className="quick-grid_label">{item.label}</Text>
                      <Text className="quick-grid_description">{item.description}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
