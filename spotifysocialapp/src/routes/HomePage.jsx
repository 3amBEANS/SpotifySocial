"use client"

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
} from "@chakra-ui/react"
import { FaMusic, FaUsers, FaHeart, FaPlay, FaCommentDots, FaArrowRight } from "react-icons/fa"
import { FaArrowTrendUp } from 'react-icons/fa6'
import { useNavigate} from "react-router-dom";

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
  ]

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
  ]

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
  ]

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
  ]
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="black">
      {/* Hero Section */}
      <Box bg="linear-gradient(135deg, #71B340 0%, #669D31 100%)" py={20}>
        <Container maxW="6xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="2xl" color="black" fontWeight="bold">
              Welcome to Spotify Connect
            </Heading>
            <Text fontSize="lg" color="blackAlpha.800" maxW="2xl">
              Engage with your favorite tracks and connect with other music lovers. Discover new sounds, share your
              taste, and join the conversation.
            </Text>
            <Button
              size="lg"
              bg="black"
              color="white"
              _hover={{ bg: "blackAlpha.800" }}
              rightIcon={<Icon as={FaArrowRight} />}
              onClick={() => (window.location.href = "/profile")}
            >
              Explore Your Profile
            </Button>
          </VStack>
        </Container>
      </Box>

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
                bg="spotify.primary"
                color="black"
                _hover={{ opacity: 0.9 }}
                leftIcon={<Icon as={FaPlay} />}
                onClick={() => (window.location.href = "/")}
              >
                Listen Again
              </Button>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {likedSongs.map((song) => (
                <Card key={song.id} bg="#1a1a1a" border="none" _hover={{ bg: "#222" }} transition="background 0.2s">
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
                bg="spotify.primary"
                color="black"
                _hover={{ opacity: 0.9 }}
                leftIcon={<Icon as={FaUsers} />}
                onClick={() => (window.location.href = "/")}
              >
                View All Artists
              </Button>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {topArtists.map((artist) => (
                <Card key={artist.id} bg="#1a1a1a" border="none" _hover={{ bg: "#222" }} transition="background 0.2s">
                  <CardBody>
                    <VStack spacing={4}>
                      <Avatar size="xl" src={artist.image} bg="spotify.tertiary" color="white" name={artist.name} />
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

          {/* Latest Forum Discussions
          <Box>
            <VStack spacing={6} textAlign="center" mb={8}>
              <Heading size="xl" color="white">
                Latest Forum Discussions
              </Heading>
              <Text color="whiteAlpha.600">Join the conversation with other music lovers</Text>
              <Button
                bg="spotify.primary"
                color="black"
                _hover={{ opacity: 0.9 }}
                leftIcon={<Icon as={FaCommentDots} />}
                onClick={() => (window.location.href = "/forum")}
              >
                Create New Post
              </Button>
            </VStack>
            <VStack spacing={4} align="stretch">
              {forumPosts.map((post) => (
                <Card
                  key={post.id}
                  bg="#1a1a1a"
                  border="none"
                  _hover={{ bg: "#222" }}
                  transition="background 0.2s"
                  cursor="pointer"
                  onClick={() => (window.location.href = "/forum")}
                >
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Box
                        w="100%"
                        h="200px"
                        bg="whiteAlpha.100"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="whiteAlpha.400" fontSize="sm">
                          Post Image
                        </Text>
                      </Box>
                      <VStack spacing={2} align="flex-start">
                        <Text fontWeight="bold" color="white" fontSize="lg">
                          {post.title}
                        </Text>
                        <HStack spacing={4} fontSize="sm" color="whiteAlpha.600">
                          <Text>{post.author}</Text>
                          <Text>{post.timestamp}</Text>
                        </HStack>
                        <HStack spacing={4}>
                          <HStack spacing={1}>
                            <Icon as={FaHeart} color="whiteAlpha.600" boxSize={4} />
                            <Text color="whiteAlpha.600" fontSize="sm">
                              {post.likes}
                            </Text>
                          </HStack>
                          <HStack spacing={1}>
                            <Icon as={FaCommentDots} color="whiteAlpha.600" boxSize={4} />
                            <Text color="whiteAlpha.600" fontSize="sm">
                              {post.replies}
                            </Text>
                          </HStack>
                        </HStack>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box> */}

          {/* Discover Public Profiles
          <Box>
            <VStack spacing={6} textAlign="center" mb={8}>
              <Heading size="xl" color="white">
                Discover Public Profiles
              </Heading>
              <Text color="whiteAlpha.600">Explore what other users are listening to</Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
              {publicProfiles.map((profile) => (
                <Card
                  key={profile.id}
                  bg="#1a1a1a"
                  border="none"
                  _hover={{ bg: "#222" }}
                  transition="background 0.2s"
                  cursor="pointer"
                  onClick={() => (window.location.href = "/discover")}
                >
                  <CardBody>
                    <VStack spacing={4}>
                      <Box position="relative">
                        <Avatar
                          size="xl"
                          src={profile.avatar}
                          bg="spotify.tertiary"
                          color="white"
                          name={profile.name}
                        />
                        {profile.isOnline && (
                          <Box
                            position="absolute"
                            bottom="0"
                            right="0"
                            w={6}
                            h={6}
                            borderRadius="full"
                            border="3px solid"
                            borderColor="#1a1a1a"
                            bg="spotify.primary"
                          />
                        )}
                      </Box>
                      <Text fontWeight="bold" color="white">
                        {profile.name}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
            <Flex justify="center">
              <Button
                bg="spotify.primary"
                color="black"
                _hover={{ opacity: 0.9 }}
                rightIcon={<Icon as={FaArrowRight} />}
                onClick={() => (window.location.href = "/discover")}
              >
                View More
              </Button>
            </Flex>
          </Box> */}

          {/* Quick Navigation Cards */}
          <Box>
            <VStack spacing={6} textAlign="center" mb={8}>
              <Heading size="xl" color="white">
                Quick Access
              </Heading>
              <Text color="whiteAlpha.600">Jump to your favorite sections</Text>
            </VStack>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
              <Card
                bg="#1a1a1a"
                border="none"
                _hover={{ bg: "#222", transform: "translateY(-4px)" }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => navigate('/profile')}
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
                onClick={() => navigate('/library/liked-songs')}
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
                onClick={() => (navigate('/library/top-artists'))}
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
                onClick={() => (navigate('/library/top-songs'))}
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
  )
}
