"use client"

import { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Select,
  Badge,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  VStack,
  HStack,
  Icon,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react"
import {
  FaCommentDots,
  FaUsers,
  FaClock,
  FaThumbtack,
  FaHeart,
  FaComment,
  FaShare,
  FaPlus,
} from "react-icons/fa"
import { FaArrowTrendUp } from "react-icons/fa6";
import { SearchIcon } from "@chakra-ui/icons"
import axios from "axios";
import { AuthContext } from "../AuthContext";
import TimeAgo from 'react-timeago';


export default function ForumPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newForum, setNewForum] = useState({
    title: "",
    description: "",
    category: "Discussion",
    isPrivate: false,
  })

  const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  }
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`
    }
  }
  
  return 'Just now'
}

  const [forums, setForums] = useState([]);

  const categories = ["all", "Discovery", "Discussion", "Events", "Production", "Collecting", "Education"]

  const filteredForums = forums.filter((forum) => {
    const matchesSearch =
      forum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || forum.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getForums = async () => {
    try {
        const response = await axios.get(`https://test-spotify-site.local:5050/api/forums/public/`);
        //console.log(response.data);
        setForums(response.data);
        //return response.data;
    } catch(e){
        console.error("Error fetching posts:", e);
    }    
  }

  const handleForumClick = (forumId) => {
    window.location.href = `/forum/${forumId}`
  }

  const handleLikePost = (postId) => {
    console.log("Liked post:", postId)
  }

  const handleCreateForum = async () => {
     if (newForum.title.trim() && newForum.description.trim()) {
    try {
      // 1. Get user data
      const response = await axios.get(`https://test-spotify-site.local:5050/api/users/${user.id}`);
      
      // 2. Create forum object
      const forum = {
        name: newForum.title,
        description: newForum.description,
        category: newForum.category,
        memberCount: 1,
        postCount: 0,
        lastActivity: Date.now(),
        isPopular: false,
        isPinned: false,
        moderators: [response.data.username],
        members: [user.id],
        recentPosts: [],
      };

      // 3. Wait for creation to complete
      await axios.post(
        "https://test-spotify-site.local:5050/api/forums/seed", 
        forum, 
        { withCredentials: false }
      );

      // 4. Add slight delay for Firestore propagation
      //await new Promise(resolve => setTimeout(resolve, 300));
      
      // 5. Refresh forums
      await getForums();
      setNewForum({
        title: "",
        description: "",
        category: "Discussion",
        isPrivate: false,
      });
      
      // 6. Close modal
      onClose();
    } catch (err) {
      console.error("Forum creation error:", err);
    }
  }
  }
  
  useEffect(() => {
      getForums(); 
  }, []);

  return (
    <Box minH="100vh" p={4} >
      <Box maxW="7xl" mx="auto">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack spacing={4} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontSize="5xl" fontWeight="bold" color="white">
                Community Forums
              </Text>
              <Button
                onClick={onOpen}
                size="lg"
                bg="spotify.primary"
                color="white"
                border="1px solid"
                borderColor="white"
                _hover={{ bg: "#43b164",
                  opacity: 0.9 }}
                leftIcon={<Icon as={FaPlus} />}
              >
                Create Forum
              </Button>
            </Flex>
            <Text fontSize="lg" color="whiteAlpha.600">
              Join discussions about music, discover new artists, and connect with fellow music lovers
            </Text>
          </VStack>

          {/* Search and Filters */}
          <Flex direction={{ base: "column", lg: "row" }} gap={4}>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="whiteAlpha.400" />
              </InputLeftElement>
              <Input
                placeholder="Search forums by name or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
                color="white"
                _placeholder={{ color: "whiteAlpha.400" }}
              />
            </InputGroup>
            <Wrap spacing={2} overflowX="auto">
              {categories.map((category) => (
                <WrapItem key={category}>
                  <Button
                    variant={selectedCategory === category ? "solid" : "outline"}
                    size="md"
                    onClick={() => setSelectedCategory(category)}
                    bg={selectedCategory === category ? "#43b164" : "transparent"}
                    borderColor="spotify.primary"
                    color={selectedCategory === category ? "white" : "spotify.primary"}
                    _hover={{
                      bg: selectedCategory === category ? "spotify.primary" : "spotify.primary",
                      color: selectedCategory === category ? "gray" : "gray",
                    }}
                    textTransform="capitalize"
                    whiteSpace="nowrap"
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </Flex>

          {/* Forums Grid */}
          <VStack spacing={6} align="stretch">
            {filteredForums.map((forum) => (
              <Card key={forum.id} bg="#1a1a1a" border="none" _hover={{ bg: "#222" }} transition="background 0.2s" onClick={() => handleForumClick(forum.id)}>
                <CardHeader pb={4}>
                  <Flex justify="space-between" align="flex-start">
                    <HStack spacing={3} align="flex-start">
                      <Flex w={12} h={12} borderRadius="lg" bg="spotify.primary" align="center" justify="center">
                        <Icon as={FaCommentDots} color="white" boxSize={6} />
                      </Flex>
                      <Box flex={1} >
                        <HStack spacing={2} mb={1} >
                          <Text
                            color="white"
                            fontWeight="semibold"
                            _hover={{ color: "spotify.primary" }}
                            cursor="pointer"
                            transition="color 0.2s"
                            // onClick={() => handleForumClick(forum.id)}
                          > 
                            {forum.name}
                          </Text>
                          {forum.isPinned && <Icon as={FaThumbtack} color="spotify.primary" boxSize={4} />}
                          {forum.isPopular && (
                            <Badge bg="spotify.secondary" color="white">
                              <HStack spacing={1}>
                                <Icon as={FaArrowTrendUp} boxSize={3} />
                                <Text>Popular</Text>
                              </HStack>
                            </Badge>
                          )}
                        </HStack>
                        <Text color="whiteAlpha.700" fontSize="sm" mb={2}>
                          {forum.description}
                        </Text>
                        <HStack spacing={4} fontSize="xs" color="whiteAlpha.500">
                          <HStack spacing={1}>
                            <Icon as={FaUsers} boxSize={3} />
                            <Text>{forum.memberCount.toLocaleString()} members</Text>
                          </HStack>
                          <HStack spacing={1}>
                            <Icon as={FaCommentDots} boxSize={3} />
                            <Text>{forum.postCount.toLocaleString()} posts</Text>
                          </HStack>
                          <HStack spacing={1}>
                            <Icon as={FaClock} boxSize={3} />
                            <Text>Last Activity:</Text>
                            <TimeAgo date={forum.lastActivity} /> 
                          </HStack>
                        </HStack>
                      </Box>
                    </HStack>
                    <Badge variant="outline" borderColor="whiteAlpha.200" color="whiteAlpha.600">
                      {forum.category}
                    </Badge>
                  </Flex>
                </CardHeader>
                <CardBody>
                  {/* Recent Posts */}
                  <VStack spacing={3} align="stretch">
                    <Text fontSize="sm" fontWeight="medium" color="whiteAlpha.800">
                      Recent Posts
                    </Text>
                    {forum.recentPosts.map((post) => (
                      <Box
                        key={post.id}
                        p={3}
                        borderRadius="lg"
                        bg="whiteAlpha.50"
                        _hover={{ bg: "whiteAlpha.100" }}
                        transition="background 0.2s"
                        cursor="pointer"
                        onClick={() => handleForumClick(forum.id)}
                      >
                        <HStack spacing={3} align="flex-start">
                          <Avatar size="sm" src={post.authorAvatar} bg="spotify.tertiary" color="white" />
                          <Box flex={1} minW={0}>
                            <Text
                              color="white"
                              fontWeight="medium"
                              fontSize="sm"
                              noOfLines={1}
                              _hover={{ color: "spotify.primary" }}
                              transition="color 0.2s"
                            >
                              {post.title}
                            </Text>
                            <HStack spacing={3} mt={1} fontSize="xs" color="whiteAlpha.500">
                              <Text>by {post.author}</Text>
                              <Text>{formatTimeAgo(
                                typeof post.timestamp === 'string' 
                                  ? parseInt(post.timestamp) 
                                  : post.timestamp
                              )}</Text>
                            </HStack>
                            {/* <HStack spacing={4} mt={2}>
                              <Button
                                variant="ghost"
                                size="xs"
                                color="whiteAlpha.600"
                                _hover={{ color: "spotify.primary" }}
                                leftIcon={<Icon as={FaHeart} />}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleLikePost(post.id)
                                }}
                              >
                                {post.likes}
                              </Button>
                              <HStack spacing={1} fontSize="xs" color="whiteAlpha.600">
                                <Icon as={FaComment} boxSize={3} />
                                <Text>{post.replies}</Text>
                              </HStack>
                              <Button
                                variant="ghost"
                                size="xs"
                                color="whiteAlpha.600"
                                _hover={{ color: "spotify.primary" }}
                                leftIcon={<Icon as={FaShare} />}
                              >
                                Share
                              </Button>
                            </HStack> */}
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>

                  {/* Moderators */}
                  <Box mt={4} pt={3} borderTop="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="center" fontSize="xs">
                      <HStack spacing={2} color="whiteAlpha.500">
                        <Text>Created by:</Text>
                        <HStack spacing={1}>
                          {forum.moderators.map((mod, index) => (
                            <Text key={index} color="spotify.primary">
                              @{mod}
                            </Text>
                          ))}
                        </HStack>
                      </HStack>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="spotify.primary"
                        color="spotify.primary"
                        _hover={{ bg: "spotify.primary", color: "gray" }}
                        onClick={() => handleForumClick(forum.id)}
                      >
                        View Forum
                      </Button>
                    </Flex>
                  </Box>
                </CardBody>
              </Card>
            ))}
          </VStack>

          {/* No Results */}
          {filteredForums.length === 0 && (
            <VStack spacing={4} py={12}>
              <Icon as={FaCommentDots} boxSize={12} color="whiteAlpha.200" />
              <Text fontSize="lg" fontWeight="medium" color="white">
                No forums found
              </Text>
              <Text color="whiteAlpha.600">Try adjusting your search or category filter</Text>
            </VStack>
          )}

          {/* Stats Footer */}
          <Box textAlign="center" py={8} borderTop="1px solid" borderColor="whiteAlpha.100">
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
              <GridItem>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {filteredForums.length}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Active Forums
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {filteredForums.reduce((total, forum) => total + forum.postCount, 0).toLocaleString()}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Total Posts
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {filteredForums.reduce((total, forum) => total + forum.memberCount, 0).toLocaleString()}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Community Members
                </Text>
              </GridItem>
            </Grid>
          </Box>

          {/* Create Forum Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent bg="#1a1a1a" border="1px solid" borderColor="whiteAlpha.200">
              <ModalHeader color="white">Create New Forum</ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody>
                <VStack spacing={6} align="stretch">
                  <FormControl isRequired>
                    <FormLabel color="white">Forum Title</FormLabel>
                    <Input
                      placeholder="Enter forum title..."
                      value={newForum.title}
                      onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
                      bg="whiteAlpha.100"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _placeholder={{ color: "whiteAlpha.400" }}
                    />
                    <FormHelperText color="whiteAlpha.600">
                      Choose a clear, descriptive title for your forum
                    </FormHelperText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="white">Description</FormLabel>
                    <Textarea
                      placeholder="Describe what this forum is about..."
                      value={newForum.description}
                      onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
                      bg="whiteAlpha.100"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _placeholder={{ color: "whiteAlpha.400" }}
                      resize="none"
                      rows={4}
                    />
                    <FormHelperText color="whiteAlpha.600">
                      Explain the purpose and topics covered in this forum
                    </FormHelperText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="white">Category</FormLabel>
                    <Select
                      value={newForum.category}
                      onChange={(e) => setNewForum({ ...newForum, category: e.target.value })}
                      bg="whiteAlpha.100"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                    >
                      <option value="Discovery" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
                        Discovery
                      </option>
                      <option value="Discussion" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
                        Discussion
                      </option>
                      <option value="Events" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
                        Events
                      </option>
                      <option value="Production" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
                        Production
                      </option>
                      <option value="Collecting" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
                        Collecting
                      </option>
                      <option value="Education" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
                        Education
                      </option>
                    </Select>
                    <FormHelperText color="whiteAlpha.600">
                      Select the most appropriate category for your forum
                    </FormHelperText>
                  </FormControl>

                  <Box p={4} bg="whiteAlpha.50" borderRadius="lg">
                    <VStack spacing={3} align="stretch">
                      <Text color="white" fontWeight="medium" fontSize="sm">
                        Forum Settings
                      </Text>
                      <HStack justify="space-between">
                        <VStack align="flex-start" spacing={1}>
                          <Text color="white" fontSize="sm">
                            Initial Moderator
                          </Text>
                          <Text color="whiteAlpha.600" fontSize="xs">
                            You will be the initial moderator
                          </Text>
                        </VStack>
                        <Badge bg="spotify.primary" color="white">
                          @you
                        </Badge>
                      </HStack>
                      {/* <HStack justify="space-between">
                        <VStack align="flex-start" spacing={1}>
                          <Text color="white" fontSize="sm">
                            Visibility
                          </Text>
                          <Text color="whiteAlpha.600" fontSize="xs">
                            Forum will be public by default
                          </Text>
                        </VStack>
                        <Badge variant="outline" borderColor="whiteAlpha.200" color="whiteAlpha.600">
                          Public
                        </Badge>
                      </HStack> */}
                    </VStack>
                  </Box>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ bg: "whiteAlpha.100" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateForum}
                  bg="spotify.primary"
                  color="white"
                  _hover={{ opacity: 0.9 }}
                  isDisabled={!newForum.title.trim() || !newForum.description.trim()}
                >
                  Create Forum
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      </Box>
    </Box>
  )
}
