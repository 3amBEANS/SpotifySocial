"use client"

import { useState, useEffect } from "react";
import { 
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Grid,
  GridItem,
  Icon,
  Wrap,
  WrapItem,
  Spinner,
  Badge,
  Flex,
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaMusic, FaUser, FaCommentDots, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ViewUserProfileModal from "./ViewUserProfileModal";

export default function DiscoverPage() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://test-spotify-site.local:5050/api/users/public", {
        withCredentials: false,
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.error("Error loading users", err))
      .finally(() => setLoading(false));
  }, []);

  const processedUsers = users.map(user => ({
    ...user,
    bio: (user.bio && user.bio.trim() !== "") ? user.bio : "Avid Listener and Promoter of Great Music"
  }));

  const filteredUsers = users.filter((user) => {
    const name = user.name || user.display_name || "";
    const username = user.username || "";
    const bio = user.bio;
    const location = user.location || "";
    const joinDate = user.joinDate || "";
    const tags = user.tags ? user.tags.join(" ") : "";
    
    const searchLower = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(searchLower) ||
      username.toLowerCase().includes(searchLower) ||
      bio.toLowerCase().includes(searchLower) ||
      location.toLowerCase().includes(searchLower) ||
      joinDate.toLowerCase().includes(searchLower) || // Added joinDate to search
      tags.toLowerCase().includes(searchLower)
    );
});

  const handleViewProfile = (userId) => {
    console.log("View profile:", userId);
    setSelectedUserId(userId);
    onOpen();
  };

  const handleSendMessage = (userId) => {
    navigate(`/inbox?to=${userId}`);
  };

  return (
    <Box minH="100vh" p={4} >
      <Box maxW="7xl" mx="auto">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack spacing={4} align="stretch">
            <Text fontSize="3xl" fontWeight="bold" color="white">
              Discover
            </Text>
            <Text color="whiteAlpha.600">
              Find and connect with music lovers around the world
            </Text>
          </VStack>

          {/* Search */}
          <InputGroup flex={1}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="whiteAlpha.400" />
            </InputLeftElement>
            <Input
              placeholder="Search users by name, username, or interests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="white"
              _placeholder={{ color: "whiteAlpha.400" }}
            />
          </InputGroup>

          {/* Loading State */}
          {loading && (
            <Flex justify="center" py={12}>
              <Spinner size="xl" color="spotify.primary" />
            </Flex>
          )}

          {/* Users Grid */}
          {!loading && (
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {filteredUsers.map((user) => (
                <GridItem key={user.id}>
                  <Card bg="#1a1a1a" border="none" _hover={{ bg: "#222" }} transition="background 0.2s">
                    <CardHeader pb={4}>
                      <HStack spacing={3} align="flex-start">
                        <Avatar
                          size="lg"
                          src={user.avatar_url}
                          border="2px solid"
                          borderColor="spotify.secondary"
                          bg="spotify.tertiary"
                          color="white"
                          name={user.name || user.display_name || "U"}
                        />
                        <Box flex={1} minW={0}>
                          <Text fontWeight="semibold" color="white" isTruncated>
                            {user.name || user.display_name || "Unnamed User"}
                          </Text>
                          {user.username && (
                            <Text fontSize="sm" color="whiteAlpha.600" isTruncated>
                              @{user.username}
                            </Text>
                          )}
                          {user.location && (
                            <HStack spacing={2} mt={1}>
                              <Icon as={FaMapMarkerAlt} color="whiteAlpha.400" boxSize={3} />
                              <Text fontSize="xs" color="whiteAlpha.400" isTruncated>
                                {user.location}
                              </Text>
                            </HStack>
                          )}
                        </Box>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        {/* Bio */}
                        <Text fontSize="sm" color="whiteAlpha.800" noOfLines={2}>
                          {(user.bio && user.bio.trim() !== "") ? user.bio : "Avid Listener and Promoter of Great Music"}
                        </Text>

                        {/* Top Artists Preview */}
                        {user.topArtists?.length > 0 && (
                          <Box>
                            <HStack spacing={2} mb={2}>
                              <Icon as={FaUsers} color="spotify.primary" boxSize={4} />
                              <Text fontSize="sm" fontWeight="medium" color="white">
                                Top Artists
                              </Text>
                            </HStack>
                            <Wrap spacing={1}>
                              {user.topArtists.slice(0, 2).map((artist, index) => (
                                <WrapItem key={index}>
                                  <Badge bg="spotify.secondary" color="white" fontSize="xs">
                                    {artist}
                                  </Badge>
                                </WrapItem>
                              ))}
                              {user.topArtists.length > 2 && (
                                <WrapItem>
                                  <Badge
                                    variant="outline"
                                    borderColor="whiteAlpha.200"
                                    color="whiteAlpha.600"
                                    fontSize="xs"
                                  >
                                    +{user.topArtists.length - 2}
                                  </Badge>
                                </WrapItem>
                              )}
                            </Wrap>
                          </Box>
                        )}

                        {/* Recent Plays Preview */}
                        {user.topSongs?.length > 0 && (
                          <Box>
                            <HStack spacing={2} mb={2}>
                              <Icon as={FaMusic} color="spotify.primary" boxSize={4} />
                              <Text fontSize="sm" fontWeight="medium" color="white">
                                Recent Plays
                              </Text>
                            </HStack>
                            <VStack spacing={1} align="stretch">
                              {user.topSongs.slice(0, 2).map((song, index) => (
                                <Text key={index} fontSize="xs" color="whiteAlpha.700">
                                  <Text as="span" fontWeight="medium">
                                    {song.title}
                                  </Text>
                                  <Text as="span" color="whiteAlpha.500">
                                    {" "}
                                    by {song.artist}
                                  </Text>
                                </Text>
                              ))}
                            </VStack>
                          </Box>
                        )}

                        {/* Join Date */}
                        {user.joinDate && (
                          <HStack spacing={2} fontSize="xs" color="whiteAlpha.400">
                            <Icon as={FaCalendarAlt} boxSize={3} />
                            <Text>Joined {user.joinDate}</Text>
                          </HStack>
                        )}

                        {/* Action Buttons */}
                        <HStack spacing={2} pt={2}>
                          <Button
                            onClick={() => handleViewProfile(user.id)}
                            size="sm"
                            flex={1}
                            variant="outline"
                            borderColor="whiteAlpha.200"
                            color="white"
                            _hover={{ bg: "whiteAlpha.100" }}
                            leftIcon={<Icon as={FaUser} />}
                          >
                            View Profile
                          </Button>
                          <Button
                            onClick={() => handleSendMessage(user.id)}
                            size="sm"
                            variant="outline"
                            borderColor="whiteAlpha.200"
                            color="white"
                            _hover={{ bg: "whiteAlpha.100" }}
                            leftIcon={<Icon as={FaCommentDots} />}
                          >
                            Message
                          </Button>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          )}

          {/* Profile Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent bg="black" borderRadius="lg" overflow="hidden">
              <ModalCloseButton color="white" zIndex={10} />
              {selectedUserId && (
                <ViewUserProfileModal userId={selectedUserId} onClose={onClose} />
              )}
            </ModalContent>
          </Modal>

          {/* No Results */}
          {!loading && filteredUsers.length === 0 && (
            <VStack spacing={4} py={12}>
              <Icon as={FaUsers} boxSize={12} color="whiteAlpha.200" />
              <Text fontSize="lg" fontWeight="medium" color="white">
                No users found
              </Text>
              <Text color="whiteAlpha.600">
                Try adjusting your search
              </Text>
            </VStack>
          )}

          {/* Stats Footer */}
          {!loading && (
            <Box textAlign="center" py={8} borderTop="1px solid" borderColor="whiteAlpha.100">
              <Text color="whiteAlpha.400" fontSize="sm">
                Showing {filteredUsers.length} of {users.length} public users
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}