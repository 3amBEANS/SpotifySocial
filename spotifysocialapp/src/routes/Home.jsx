import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box as="section" py={20} bg="gray.900" color="white">
        <Container textAlign="center">
          <Heading size="2xl" mb={4}>
            Welcome to Your Music Hub
          </Heading>
          <Text fontSize="lg" mb={6}>
            Engage with your favorite tracks and connect with other music lovers.
          </Text>
          <Button colorScheme="teal" size="lg">
            Explore Now
          </Button>
        </Container>
      </Box>

      {/* Your Liked Songs Section */}
      <Container py={16}>
        <VStack align="start" spacing={4}>
          <Heading size="xl">Your Liked Songs</Heading>
          <Text>Here are the songs you love the most!</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
            {/* Song Card */}
            <Box p={4} borderWidth={1} borderRadius="md">
              <Heading size="md">Song Title 1</Heading>
              <Text>Artist Name 1</Text>
              <Text fontSize="sm" color="gray.500">
                Pop • 2021
              </Text>
            </Box>
            <Box p={4} borderWidth={1} borderRadius="md">
              <Heading size="md">Song Title 2</Heading>
              <Text>Artist Name 2</Text>
              <Text fontSize="sm" color="gray.500">
                Rock • 2020
              </Text>
            </Box>
            <Box p={4} borderWidth={1} borderRadius="md">
              <Heading size="md">Song Title 3</Heading>
              <Text>Artist Name 3</Text>
              <Text fontSize="sm" color="gray.500">
                Jazz • 2022
              </Text>
            </Box>
          </SimpleGrid>
          <Button variant="outline" colorScheme="teal" alignSelf="center">
            Listen Again
          </Button>
        </VStack>
      </Container>

      {/* Latest Forum Discussions Section */}
      <Box as="section" py={16} bg="gray.50">
        <Container>
          <VStack align="start" spacing={4}>
            <Heading size="xl">Latest Forum Discussions</Heading>
            <Text>Join the conversation with other music lovers.</Text>
            <Button colorScheme="teal" variant="solid">
              Create New Post
            </Button>
            <VStack align="stretch" spacing={3} w="100%">
              {/* Discussion item */}
              <Flex p={4} borderWidth={1} borderRadius="md" align="center">
                <Avatar name="User123" size="sm" mr={3} />
                <Box>
                  <Text fontWeight="bold">
                    User123{" "}
                    <Text as="span" fontWeight="normal" color="gray.500" fontSize="sm">
                      2 hours ago
                    </Text>
                  </Text>
                  <Text>Great album! What do you think about the new album by XYZ?</Text>
                </Box>
              </Flex>

              <Flex p={4} borderWidth={1} borderRadius="md" align="center">
                <Avatar name="MusicFan99" size="sm" mr={3} />
                <Box>
                  <Text fontWeight="bold">
                    MusicFan99{" "}
                    <Text as="span" fontWeight="normal" color="gray.500" fontSize="sm">
                      1 day ago
                    </Text>
                  </Text>
                  <Text>Loved this song! I can't stop listening to this track!</Text>
                </Box>
              </Flex>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Discover Public Profiles Section */}
      <Container py={16}>
        <VStack align="start" spacing={4}>
          <Heading size="xl">Discover Public Profiles</Heading>
          <Text>Explore what other users are listening to.</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
            <Box p={4} borderWidth={1} borderRadius="md" textAlign="center">
              <Avatar name="User01" size="lg" mb={2} />
              <Text fontWeight="semibold">User01</Text>
              <Text fontSize="sm" color="gray.500">
                Top Listener
              </Text>
            </Box>
            <Box p={4} borderWidth={1} borderRadius="md" textAlign="center">
              <Avatar name="MusicLover99" size="lg" mb={2} />
              <Text fontWeight="semibold">MusicLover99</Text>
              <Text fontSize="sm" color="gray.500">
                Pop Enthusiast
              </Text>
            </Box>
            <Box p={4} borderWidth={1} borderRadius="md" textAlign="center">
              <Avatar name="TravelingTunes" size="lg" mb={2} />
              <Text fontWeight="semibold">TravelingTunes</Text>
              <Text fontSize="sm" color="gray.500">
                World Music Curator
              </Text>
            </Box>
          </SimpleGrid>
          <Button colorScheme="teal" size="md" alignSelf="center">
            Explore Now
          </Button>
        </VStack>
      </Container>
    </>
  );
}
