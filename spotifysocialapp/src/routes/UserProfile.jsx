"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Textarea,
  Switch,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Badge,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaMusic, FaUsers, FaHeart } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(true);
  const [showTopSongs, setShowTopSongs] = useState(true);
  const [showLikedSongs, setShowLikedSongs] = useState(false);

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
    <Box minH="100vh" p={4} bg="black">
      <Box maxW="4xl" mx="auto">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Profile
            </Text>
            <HStack>
              <Icon as={isPrivate ? ViewOffIcon : ViewIcon} color="white" />
              <Text fontSize="sm" color="white">
                {isPrivate ? "Private" : "Public"}
              </Text>
            </HStack>
          </Flex>

          {/* Main Profile Card */}
          <Card bg="#1a1a1a" border="none">
            <CardHeader pb={4}>
              <Flex justify="space-between" align="flex-start">
                <HStack spacing={4} align="flex-start">
                  <Avatar
                    size="xl"
                    src="/placeholder.svg?height=96&width=96"
                    border="4px solid"
                    borderColor="spotify.secondary"
                    bg="spotify.tertiary"
                    color="white"
                    name="AR"
                  />
                  <VStack align="flex-start" spacing={2}>
                    {isEditing ? (
                      <VStack spacing={2} align="stretch">
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          fontSize="xl"
                          fontWeight="bold"
                          bg="whiteAlpha.100"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          color="white"
                        />
                        <Input
                          value={profile.username}
                          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                          fontSize="sm"
                          bg="whiteAlpha.100"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          color="whiteAlpha.800"
                        />
                      </VStack>
                    ) : (
                      <>
                        <Text fontSize="2xl" fontWeight="bold" color="white">
                          {profile.name}
                        </Text>
                        <Text color="whiteAlpha.800">{profile.username}</Text>
                      </>
                    )}
                    <HStack spacing={4} fontSize="sm" color="whiteAlpha.600">
                      <Text>📍 {profile.location}</Text>
                      <Text>📅 Joined {profile.joinDate}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <HStack>
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSave}
                        size="sm"
                        bg="spotify.primary"
                        color="black"
                        _hover={{ opacity: 0.9 }}
                        leftIcon={<CheckIcon />}
                        style={{ color: "white" }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        borderColor="whiteAlpha.200"
                        color="white"
                        _hover={{ bg: "whiteAlpha.100" }}
                        leftIcon={<CloseIcon />}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _hover={{ bg: "whiteAlpha.100" }}
                      leftIcon={<EditIcon />}
                    >
                      Edit Profile
                    </Button>
                  )}
                </HStack>
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                {/* Bio */}
                <Box>
                  <Text color="whiteAlpha.800" fontSize="sm" fontWeight="medium" mb={2}>
                    Bio
                  </Text>
                  {isEditing ? (
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      bg="whiteAlpha.100"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      resize="none"
                      rows={3}
                    />
                  ) : (
                    <Text color="whiteAlpha.900">{profile.bio}</Text>
                  )}
                </Box>

                <Divider borderColor="whiteAlpha.100" />

                {/* Privacy & Display Settings */}
                <VStack spacing={4} align="stretch">
                  <Text fontSize="lg" fontWeight="semibold" color="white">
                    Privacy & Display Settings
                  </Text>
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text color="white" fontWeight="medium">
                          Private Profile
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.600">
                          Hide your profile from public discovery
                        </Text>
                      </Box>
                      <Switch
                        isChecked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        colorScheme="green"
                      />
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text color="white" fontWeight="medium">
                          Show Top Artists
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.600">
                          Display your most played artists
                        </Text>
                      </Box>
                      <Switch
                        isChecked={showTopArtists}
                        onChange={(e) => setShowTopArtists(e.target.checked)}
                        colorScheme="green"
                      />
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text color="white" fontWeight="medium">
                          Show Top Songs
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.600">
                          Display your most played tracks
                        </Text>
                      </Box>
                      <Switch
                        isChecked={showTopSongs}
                        onChange={(e) => setShowTopSongs(e.target.checked)}
                        colorScheme="green"
                      />
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text color="white" fontWeight="medium">
                          Show Liked Songs
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.600">
                          Display your liked tracks collection
                        </Text>
                      </Box>
                      <Switch
                        isChecked={showLikedSongs}
                        onChange={(e) => setShowLikedSongs(e.target.checked)}
                        colorScheme="green"
                      />
                    </Flex>
                  </VStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Music Content */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {/* Top Artists */}
            {showTopArtists && (
              <GridItem>
                <Card bg="#1a1a1a" border="none">
                  <CardHeader>
                    <HStack justify="space-between">
                      <HStack>
                        <Icon as={FaUsers} color="spotify.primary" />
                        <Text color="white" fontWeight="semibold">
                          Top Artists
                        </Text>
                      </HStack>
                      <Badge bg="spotify.primary" color="black">
                        <HStack spacing={1}>
                          <Icon style={{ color: "white" }} as={FaArrowTrendUp} boxSize={3} />
                          <Text style={{ color: "white" }}>This Month</Text>
                        </HStack>
                      </Badge>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {topArtists.map((artist, index) => (
                        <HStack
                          key={index}
                          spacing={3}
                          p={2}
                          borderRadius="lg"
                          _hover={{ bg: "whiteAlpha.100" }}
                          transition="background 0.2s"
                        >
                          <Text color="whiteAlpha.600" fontFamily="mono" fontSize="sm" w={6}>
                            {index + 1}
                          </Text>
                          <Avatar
                            size="md"
                            src={artist.image}
                            bg="spotify.tertiary"
                            color="white"
                          />
                          <Box flex={1}>
                            <Text fontWeight="medium" color="white">
                              {artist.name}
                            </Text>
                            <Text fontSize="sm" color="whiteAlpha.600">
                              {artist.followers} followers
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            )}

            {/* Top Songs */}
            {showTopSongs && (
              <GridItem>
                <Card bg="#1a1a1a" border="none">
                  <CardHeader>
                    <HStack justify="space-between">
                      <HStack>
                        <Icon as={FaMusic} color="spotify.primary" />
                        <Text color="white" fontWeight="semibold">
                          Top Songs
                        </Text>
                      </HStack>
                      <Badge bg="spotify.primary" color="black">
                        <HStack spacing={1}>
                          <Icon style={{ color: "white" }} as={FaArrowTrendUp} boxSize={3} />
                          <Text style={{ color: "white" }}>This Month</Text>
                        </HStack>
                      </Badge>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {topSongs.map((song, index) => (
                        <HStack
                          key={index}
                          spacing={3}
                          p={2}
                          borderRadius="lg"
                          _hover={{ bg: "whiteAlpha.100" }}
                          transition="background 0.2s"
                        >
                          <Text color="whiteAlpha.600" fontFamily="mono" fontSize="sm" w={6}>
                            {index + 1}
                          </Text>
                          <Flex
                            w={12}
                            h={12}
                            borderRadius="lg"
                            bg="spotify.primary"
                            align="center"
                            justify="center"
                          >
                            <Icon as={FaMusic} color="white" />
                          </Flex>
                          <Box flex={1}>
                            <Text fontWeight="medium" color="white">
                              {song.title}
                            </Text>
                            <Text fontSize="sm" color="whiteAlpha.600">
                              {song.artist}
                            </Text>
                          </Box>
                          <Box textAlign="right">
                            <Text fontSize="sm" fontWeight="medium" color="white">
                              {song.plays}
                            </Text>
                            <Text fontSize="xs" color="whiteAlpha.600">
                              plays
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            )}

            {/* Liked Songs */}
            {showLikedSongs && (
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Card bg="#1a1a1a" border="none">
                  <CardHeader>
                    <HStack justify="space-between">
                      <HStack>
                        <Icon as={FaHeart} color="spotify.primary" />
                        <Text color="white" fontWeight="semibold">
                          Liked Songs
                        </Text>
                      </HStack>
                      <Badge bg="spotify.primary" color="white">
                        247 songs
                      </Badge>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="whiteAlpha.600" textAlign="center" py={8}>
                      Your liked songs collection will appear here when you enable this feature.
                    </Text>
                  </CardBody>
                </Card>
              </GridItem>
            )}
          </Grid>
        </VStack>
      </Box>
    </Box>
  );
}
