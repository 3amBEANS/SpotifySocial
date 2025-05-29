import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  Avatar,
  Card,
  CardBody,
  VStack,
  HStack,
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
import LoginModal from "../components/LoginModal";

export default function HomePage() {
  // Mock data
  const likedSongs = [
    {
      id: 1,
      title: "The Less I Know The Better",
      artist: "Tame Impala",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 2,
      title: "Motion Sickness",
      artist: "Phoebe Bridgers",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 3,
      title: "Good News",
      artist: "Mac Miller",
      image: "/placeholder.svg?height=120&width=120",
    },
  ];

  const topArtists = [
    {
      id: 1,
      name: "Tame Impala",
      image: "/placeholder.svg?height=80&width=80",
      followers: "2.1M",
    },
    {
      id: 2,
      name: "Phoebe Bridgers",
      image: "/placeholder.svg?height=80&width=80",
      followers: "1.8M",
    },
    {
      id: 3,
      name: "Mac Miller",
      image: "/placeholder.svg?height=80&width=80",
      followers: "3.2M",
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
  const { user } = useContext(AuthContext);
  const [profileSetup, setProfileSetup] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const filmArtists = [...localFilmArtists, ...localFilmArtists];

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

  const localFilmArtists = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    imageUrl: `/assets/artists/${i + 1}.jpg`,
  }));

  const scroll = keyframes`
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  `;

  return (
    <Box minH="100vh">
      {/* Hero Section */}
      {/* <Box h="200px" bg="gray.900" overflow="hidden" position="relative" mb={8}> */}
      <Box position="relative" minH="240px" overflow="hidden" mb={8}>
        {/* <Flex
          as="div"
          animation={`${scroll} 60s linear infinite`}
          width="200%" // we duplicate the list
        > */}
        <Flex
          as="div"
          position="absolute"
          top={0}
          left={0}
          w="200%" // duplicate list
          h="100%"
          animation={`${scroll} 60s linear infinite`}
          zIndex={0}
        >
          {[...filmArtists, ...filmArtists].map((artist, i) => (
            <Box
              key={`${artist.id}-${i}`}
              flex="0 0 auto"
              w="120px"
              h="240px"
              mx="2"
              overflow="hidden"
              bg="gray.800"
            >
              <Image src={artist.imageUrl} alt={artist.name} objectFit="cover" w="100%" h="100%" />
            </Box>
          ))}
        </Flex>
        <Container maxW="6xl" position="relative" zIndex={1} pt={16} pb={8} textAlign="center">
          {/* <VStack spacing={6} textAlign="center"> */}
          <Heading size="2xl" color="white" fontWeight="bold" mb={4}>
            Welcome to Spotify Connect
          </Heading>
          <Text fontSize="lg" color="whiteAlpha.800" maxW="2xl" mx="auto" my={6}>
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
          {/* </VStack> */}
        </Container>
      </Box>

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* <Box bg="linear-gradient(135deg, #71B340 0%, #669D31 100%)" py={20}> */}

      {/* <Container maxW="6xl" py={16}> */}
      {/* </Box> */}

      <Container maxW="6xl" py={16}>
        <VStack spacing={16} align="stretch">
          {/* Your Liked Songs Section */}
          <Box>
            <VStack spacing={6} textAlign="center" mb={8}>
              <Heading size="xl" color="white">
                Your Liked Songs
              </Heading>
              <Text color="whiteAlpha.600">Here are the songs you love the most</Text>
              <Button
                bg="#93C259"
                color="white"
                _hover={{ opacity: 0.9 }}
                leftIcon={<Icon as={FaPlay} color="white" boxSize="4" m="4" />}
                onClick={() => handleProtectedNav("/library/liked-songs")}
              >
                Listen Again
              </Button>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {likedSongs.map((song) => (
                <Card
                  key={song.id}
                  bg="#1a1a1a"
                  border="none"
                  _hover={{ bg: "#222" }}
                  transition="background 0.2s"
                >
                  <CardBody>
                    <VStack spacing={4}>
                      <Box
                        w="120px"
                        h="120px"
                        bg="spotify.primary"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FaMusic} color="white" boxSize={8} />
                      </Box>
                      <VStack spacing={1} textAlign="center">
                        <Text fontWeight="bold" color="white" fontSize="sm">
                          {song.title}
                        </Text>
                        <Text color="whiteAlpha.600" fontSize="sm">
                          {song.artist}
                        </Text>
                      </VStack>
                    </VStack>
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
              <Text color="whiteAlpha.600">Artists you can't get enough of</Text>
              <Button
                bg="#93C259"
                color="white"
                _hover={{ opacity: 0.9 }}
                leftIcon={<Icon as={FaUsers} />}
                onClick={() => handleProtectedNav("/library/top-artists")}
              >
                View All Artists
              </Button>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {topArtists.map((artist) => (
                <Card
                  key={artist.id}
                  bg="#1a1a1a"
                  border="none"
                  _hover={{ bg: "#222" }}
                  transition="background 0.2s"
                >
                  <CardBody>
                    <VStack spacing={4}>
                      <Avatar
                        size="xl"
                        src={artist.image}
                        bg="spotify.tertiary"
                        color="white"
                        name={artist.name}
                      />
                      <VStack spacing={1} textAlign="center">
                        <Text fontWeight="bold" color="white">
                          {artist.name}
                        </Text>
                        <Text color="whiteAlpha.600" fontSize="sm">
                          {artist.followers} followers
                        </Text>
                      </VStack>
                    </VStack>
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
    </Box>
  );
}
