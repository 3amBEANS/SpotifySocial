import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  AspectRatio,
  Box,
  Flex,
  Text,
  Button,
  Avatar,
  Card,
  CardBody,
  VStack,
  Grid,
  Icon,
  Container,
  Heading,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { FaMusic, FaUsers, FaHeart, FaPlay, FaCommentDots, FaArrowRight } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { AuthContext } from "../AuthContext";
import * as artistImages from "../assets/artists";
import LoginModal from "../components/LoginModal";

const scroll = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

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

  const forumPosts = [
    {
      id: 1,
      title: "What do you think about the new album by XYZ?",
      author: "MusicLover",
      timestamp: "2 hours ago",
      replies: 24,
      likes: 156,
    },
    {
      id: 2,
      title: "I can't stop listening to this track!",
      author: "BeatFinder",
      timestamp: "4 hours ago",
      replies: 18,
      likes: 89,
    },
  ];

  const publicProfiles = [
    {
      id: 1,
      name: "User01",
      avatar: "/placeholder.svg?height=60&width=60",
      isOnline: true,
    },
    {
      id: 2,
      name: "MusicLover99",
      avatar: "/placeholder.svg?height=60&width=60",
      isOnline: false,
    },
    {
      id: 3,
      name: "TravelingTunes",
      avatar: "/placeholder.svg?height=60&width=60",
      isOnline: true,
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
      <Box position="relative" overflow="hidden" h={{ base: "320px", md: "480px" }} mb={8}>
        <Flex
          position="absolute"
          top={0}
          left={0}
          w="200%"
          h="100%"
          animation={`${scroll} 60s linear infinite`}
          zIndex={0}
        >
          {filmArtists.map((artist, i) => (
            <AspectRatio
              key={i}
              ratio={3 / 4} // forces 3:4 width:height
              w={{ base: "200px", md: "240px", lg: "300px" }}
              mx={2}
              flex="0 0 auto"
            >
              <Box bg="gray.800">
                <Image src={artist.imageUrl} alt="" objectFit="cover" w="100%" h="100%" />
              </Box>
            </AspectRatio>
          ))}
        </Flex>

        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0,0,0,0.6)"
          zIndex={1}
        />

        <Container
          maxW="6xl"
          position="relative"
          zIndex={2}
          h="100%"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px={4}
        >
          <Heading color="white" size="2xl" mb={4}>
            Welcome to Spotify Connect
          </Heading>
          <Text color="whiteAlpha.800" maxW="2xl" mb={6}>
            Engage with your favorite tracks and connect with other music lovers. Discover new
            sounds, share your taste, and join the conversation.
          </Text>
          <Button
            size="lg"
            bg="#93C259"
            color="white"
            _hover={{ bg: "blackAlpha.800" }}
            rightIcon={<Icon as={FaArrowRight} />}
            onClick={() => handleProtectedNav("/profile")}
          >
            Explore Your Profile
          </Button>
        </Container>
      </Box>

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />

      <Container maxW="6xl" py={16}>
        <VStack spacing={16} align="stretch">
          {/* Your Liked Songs Section */}
          <Box>
            <VStack spacing={6} textAlign="center" mb={8}>
              <Heading size="xl" color="white">
                Your Liked Songs
              </Heading>
              <Text color="whiteAlpha.600">
                View up to 50 of your most recently-liked tracks. Click “My Liked Songs” to see your
                full collection.
              </Text>
              <Button
                bg="#93C259"
                color="white"
                _hover={{ opacity: 0.9 }}
                leftIcon={<Icon as={FaPlay} color="white" boxSize="4" m="4" />}
                onClick={() => handleProtectedNav("/library/liked-songs")}
              >
                My Liked Songs
              </Button>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {featuredTracks.map((track) => (
                <Card
                  key={track.id}
                  href={track.link}
                  bg="#0f0e17"
                  _hover={{ bg: "#0f0e17", transform: "translateY(-4px)" }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <CardBody p={0}>
                    <AspectRatio ratio={4 / 2.6} w="100%" overflow="hidden">
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

          {/* Top Artists Section */}
          <Box>
            <VStack spacing={6} textAlign="center" mb={8}>
              <Heading size="xl" color="white">
                Your Top Artists
              </Heading>
              <Text color="whiteAlpha.600">
                See up to 50 of the artists you listen to most. Click “My Top Artists” to browse
                your full list.
              </Text>
              <Button
                bg="#93C259"
                color="white"
                _hover={{ opacity: 0.9 }}
                leftIcon={<Icon as={FaUsers} />}
                onClick={() => handleProtectedNav("/library/top-artists")}
              >
                My Top Artists
              </Button>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {featuredArtists.map((artist) => (
                <Card
                  key={artist.id}
                  href={artist.link}
                  bg="#0f0e17"
                  _hover={{ bg: "#0f0e17", transform: "translateY(-4px)" }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <CardBody p={0}>
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

          {/* Quick Navigation Cards */}
          <Box>
            <VStack spacing={6} textAlign="center" mb={8}>
              <Heading size="xl" color="white">
                Quick Access
              </Heading>
              <Text color="whiteAlpha.600">Jump to your favorite sections</Text>
            </VStack>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
              gap={6}
            >
              <Card
                bg="#1a1a1a"
                border="none"
                _hover={{ bg: "#222", transform: "translateY(-4px)" }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => handleProtectedNav("/profile")}
              >
                <CardBody textAlign="center">
                  <VStack spacing={4}>
                    <Box
                      w={16}
                      h={16}
                      bg="spotify.primary"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FaUsers} color="white" boxSize={8} />
                    </Box>
                    <Text fontWeight="bold" color="white">
                      User Profile
                    </Text>
                    <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
                      View and edit your profile settings
                    </Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                bg="#1a1a1a"
                border="none"
                _hover={{ bg: "#222", transform: "translateY(-4px)" }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => handleProtectedNav("/library/liked-songs")}
              >
                <CardBody textAlign="center">
                  <VStack spacing={4}>
                    <Box
                      w={16}
                      h={16}
                      bg="spotify.primary"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FaHeart} color="white" boxSize={8} />
                    </Box>
                    <Text fontWeight="bold" color="white">
                      Liked Songs
                    </Text>
                    <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
                      Your collection of favorite tracks
                    </Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                bg="#1a1a1a"
                border="none"
                _hover={{ bg: "#222", transform: "translateY(-4px)" }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => handleProtectedNav("/library/top-artists")}
              >
                <CardBody textAlign="center">
                  <VStack spacing={4}>
                    <Box
                      w={16}
                      h={16}
                      bg="spotify.primary"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FaMusic} color="white" boxSize={8} />
                    </Box>
                    <Text fontWeight="bold" color="white">
                      Top Artists
                    </Text>
                    <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
                      Your most played artists
                    </Text>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                bg="#1a1a1a"
                border="none"
                _hover={{ bg: "#222", transform: "translateY(-4px)" }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => handleProtectedNav("/library/top-songs")}
              >
                <CardBody textAlign="center">
                  <VStack spacing={4}>
                    <Box
                      w={16}
                      h={16}
                      bg="spotify.primary"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FaArrowTrendUp} color="white" boxSize={8} />
                    </Box>
                    <Text fontWeight="bold" color="white">
                      Top Songs
                    </Text>
                    <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
                      Your most played tracks
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </Grid>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
