import { Box, VStack, Heading, Text, Button, Grid, Image, Stack } from "@chakra-ui/react";

const likedSongs = [
  {
    title: "Song Title 1",
    artist: "Artist Name 1",
    genreYear: "Pop · 2021",
    cover: "/covers/song1.jpg",
  },
  {
    title: "Song Title 2",
    artist: "Artist Name 2",
    genreYear: "Rock · 2020",
    cover: "/covers/song2.jpg",
  },
  {
    title: "Song Title 3",
    artist: "Artist Name 3",
    genreYear: "Jazz · 2022",
    cover: "/covers/song3.jpg",
  },
];

const forumPosts = [
  {
    user: "User123",
    time: "2 hours ago",
    title: "Great album!",
    excerpt: "What do you think about the new album by XYZ?",
  },
  {
    user: "MusicFan99",
    time: "1 day ago",
    title: "Loved this song!",
    excerpt: "I can't stop listening to this track!",
  },
];

const profiles = [
  { username: "User01", role: "Top Listener", avatar: "/avatars/u01.jpg" },
  { username: "MusicLover99", role: "Pop Enthusiast", avatar: "/avatars/u02.jpg" },
  { username: "TravelingTunes", role: "World Music Curator", avatar: "/avatars/u03.jpg" },
];

export default function Home() {
  return (
    <Box bg="gray.900" color="white" minH="100vh">
      {/* Hero */}
      <VStack spacing={6} textAlign="center" px={{ base: 4, md: 16 }} py={12}>
        <Heading size="2xl">Welcome to Your Music Hub</Heading>
        <Text fontSize="lg">
          Engage with your favorite tracks and connect with other music lovers.
        </Text>
        <Button colorScheme="teal" size="lg">
          Explore Now
        </Button>
      </VStack>

      {/* Your Liked Songs */}
      <Box px={{ base: 4, md: 16 }} py={8}>
        <Heading size="lg" mb={4}>
          Your Liked Songs
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {likedSongs.map((s) => (
            <Box key={s.title} bg="gray.800" borderRadius="md" p={4}>
              <Image src={s.cover} alt={s.title} borderRadius="md" mb={3} />
              <Text fontWeight="bold">{s.title}</Text>
              <Text>{s.artist}</Text>
              <Text fontSize="sm" color="gray.400">
                {s.genreYear}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Latest Forum Discussions */}
      <Box bg="gray.800" px={{ base: 4, md: 16 }} py={8}>
        <Heading size="lg" mb={4}>
          Latest Forum Discussions
        </Heading>
        <Stack spacing={4}>
          {forumPosts.map((p) => (
            <Box key={p.title} bg="gray.700" p={4} borderRadius="md">
              <Text fontSize="sm" color="gray.400">
                {p.user} · {p.time}
              </Text>
              <Text fontWeight="semibold">{p.title}</Text>
              <Text>{p.excerpt}</Text>
            </Box>
          ))}
          <Button alignSelf="start" variant="outline" colorScheme="teal">
            Create New Post
          </Button>
        </Stack>
      </Box>

      {/* Discover Public Profiles */}
      <Box px={{ base: 4, md: 16 }} py={8}>
        <Heading size="lg" mb={4}>
          Discover Public Profiles
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
          {profiles.map((u) => (
            <Box key={u.username} bg="gray.800" p={4} borderRadius="md" textAlign="center">
              <Image
                src={u.avatar}
                alt={u.username}
                borderRadius="full"
                boxSize="80px"
                mx="auto"
                mb={3}
              />
              <Text fontWeight="bold">{u.username}</Text>
              <Text fontSize="sm" color="gray.400">
                {u.role}
              </Text>
            </Box>
          ))}
        </Grid>
        <Button mt={6} colorScheme="teal">
          Explore Now
        </Button>
      </Box>
    </Box>
  );
}
