"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  FaCommentDots,
  FaUsers,
  FaClock,
  FaThumbtack,
  FaHeart,
  FaComment,
  FaShare,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const forums = [
    {
      id: "1",
      name: "New Music Discoveries",
      description: "Share and discover the latest tracks, albums, and artists",
      category: "Discovery",
      memberCount: 15420,
      postCount: 3240,
      lastActivity: "2 minutes ago",
      isPopular: true,
      isPinned: true,
      moderators: ["@musicmod", "@beatfinder"],
      recentPosts: [
        {
          id: "1",
          title: "Just discovered this amazing indie band from Iceland!",
          author: "Maya Chen",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          timestamp: "5 minutes ago",
          likes: 23,
          replies: 8,
        },
        {
          id: "2",
          title: "Weekly New Release Thread - What's everyone listening to?",
          author: "Jordan Smith",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          timestamp: "1 hour ago",
          likes: 156,
          replies: 47,
        },
      ],
    },
    {
      id: "2",
      name: "Genre Deep Dives",
      description: "Explore specific genres, their history, and hidden gems",
      category: "Discussion",
      memberCount: 8930,
      postCount: 1850,
      lastActivity: "15 minutes ago",
      isPopular: true,
      isPinned: false,
      moderators: ["@genreexpert"],
      recentPosts: [
        {
          id: "3",
          title: "The Evolution of Shoegaze: From My Bloody Valentine to Today",
          author: "Sofia Rodriguez",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          timestamp: "3 hours ago",
          likes: 89,
          replies: 24,
        },
      ],
    },
    {
      id: "3",
      name: "Concert & Festival Reviews",
      description: "Share your live music experiences and upcoming events",
      category: "Events",
      memberCount: 12100,
      postCount: 2670,
      lastActivity: "30 minutes ago",
      isPopular: false,
      isPinned: false,
      moderators: ["@concertgoer"],
      recentPosts: [
        {
          id: "4",
          title: "Coachella 2024 Day 1 - My thoughts and highlights",
          author: "Marcus Johnson",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          timestamp: "2 hours ago",
          likes: 67,
          replies: 19,
        },
      ],
    },
    {
      id: "4",
      name: "Music Production & Tech",
      description: "Discuss gear, software, production techniques, and studio setups",
      category: "Production",
      memberCount: 6750,
      postCount: 1420,
      lastActivity: "1 hour ago",
      isPopular: false,
      isPinned: false,
      moderators: ["@producer", "@techhead"],
      recentPosts: [
        {
          id: "5",
          title: "Best budget audio interface for home recording?",
          author: "Emma Thompson",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          timestamp: "4 hours ago",
          likes: 34,
          replies: 15,
        },
      ],
    },
    {
      id: "5",
      name: "Vinyl & Physical Media",
      description: "Collectors unite! Discuss records, CDs, and physical music media",
      category: "Collecting",
      memberCount: 9200,
      postCount: 1980,
      lastActivity: "45 minutes ago",
      isPopular: true,
      isPinned: false,
      moderators: ["@vinylhead"],
      recentPosts: [
        {
          id: "6",
          title: "Found this rare pressing at a garage sale for $5!",
          author: "David Kim",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          timestamp: "6 hours ago",
          likes: 145,
          replies: 32,
        },
      ],
    },
    {
      id: "6",
      name: "Music Theory & Analysis",
      description: "Dive deep into the technical aspects of music composition and theory",
      category: "Education",
      memberCount: 4320,
      postCount: 890,
      lastActivity: "2 hours ago",
      isPopular: false,
      isPinned: false,
      moderators: ["@theorist"],
      recentPosts: [
        {
          id: "7",
          title: "Understanding modal interchange in jazz harmony",
          author: "Alex Rivera",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          timestamp: "8 hours ago",
          likes: 78,
          replies: 21,
        },
      ],
    },
  ];

  const categories = [
    "all",
    "Discovery",
    "Discussion",
    "Events",
    "Production",
    "Collecting",
    "Education",
  ];

  const filteredForums = forums.filter((forum) => {
    const matchesSearch =
      forum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || forum.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleForumClick = (forumId) => {
    navigate(`/forum/${forumId}`);
  };

  const handleLikePost = (postId) => {
    console.log("Liked post:", postId);
  };

  return (
    <Box minH="100vh" p={4} bg="black">
      <Box maxW="7xl" mx="auto">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack spacing={4} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontSize="3xl" fontWeight="bold" color="white">
                Community Forums
              </Text>
              <Badge bg="spotify.primary" color="black" px={3} py={1}>
                {forums.reduce((total, forum) => total + forum.memberCount, 0).toLocaleString()}{" "}
                members
              </Badge>
            </Flex>
            <Text color="whiteAlpha.600">
              Join discussions about music, discover new artists, and connect with fellow music
              lovers
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
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    bg={selectedCategory === category ? "spotify.primary" : "transparent"}
                    borderColor="spotify.primary"
                    color={selectedCategory === category ? "black" : "spotify.primary"}
                    _hover={{
                      bg: selectedCategory === category ? "spotify.primary" : "spotify.primary",
                      color: selectedCategory === category ? "black" : "black",
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
              <Card
                key={forum.id}
                bg="#1a1a1a"
                border="none"
                _hover={{ bg: "#222" }}
                transition="background 0.2s"
              >
                <CardHeader pb={4}>
                  <Flex justify="space-between" align="flex-start">
                    <HStack spacing={3} align="flex-start">
                      <Flex
                        w={12}
                        h={12}
                        borderRadius="lg"
                        bg="spotify.primary"
                        align="center"
                        justify="center"
                      >
                        <Icon as={FaCommentDots} color="white" boxSize={6} />
                      </Flex>
                      <Box flex={1}>
                        <HStack spacing={2} mb={1}>
                          <Text
                            color="white"
                            fontWeight="semibold"
                            _hover={{ color: "spotify.primary" }}
                            cursor="pointer"
                            transition="color 0.2s"
                            onClick={() => handleForumClick(forum.id)}
                          >
                            {forum.name}
                          </Text>
                          {forum.isPinned && (
                            <Icon as={FaThumbtack} color="spotify.primary" boxSize={4} />
                          )}
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
                            <Text>Last activity {forum.lastActivity}</Text>
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
                          <Avatar
                            size="sm"
                            src={post.authorAvatar}
                            bg="spotify.tertiary"
                            color="white"
                          />
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
                              <Text>{post.timestamp}</Text>
                            </HStack>
                            <HStack spacing={4} mt={2}>
                              <Button
                                variant="ghost"
                                size="xs"
                                color="whiteAlpha.600"
                                _hover={{ color: "spotify.primary" }}
                                leftIcon={<Icon as={FaHeart} />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLikePost(post.id);
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
                            </HStack>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>

                  {/* Moderators */}
                  <Box mt={4} pt={3} borderTop="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="center" fontSize="xs">
                      <HStack spacing={2} color="whiteAlpha.500">
                        <Text>Moderated by:</Text>
                        <HStack spacing={1}>
                          {forum.moderators.map((mod, index) => (
                            <Text key={index} color="spotify.primary">
                              {mod}
                            </Text>
                          ))}
                        </HStack>
                      </HStack>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="spotify.primary"
                        color="spotify.primary"
                        _hover={{ bg: "spotify.primary", color: "black" }}
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
                  {filteredForums
                    .reduce((total, forum) => total + forum.postCount, 0)
                    .toLocaleString()}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Total Posts
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {filteredForums
                    .reduce((total, forum) => total + forum.memberCount, 0)
                    .toLocaleString()}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Community Members
                </Text>
              </GridItem>
            </Grid>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
