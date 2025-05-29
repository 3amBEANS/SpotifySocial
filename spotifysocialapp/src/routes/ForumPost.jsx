"use client";

import { useState, useEffect} from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
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
} from "@chakra-ui/react";
import { SearchIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaThumbtack,
  FaClock,
  FaPlus,
  FaFilter,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ForumPost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const params = useParams();

  // Mock forum data
  const forumData = {
    id: params.id,
    name: "New Music Discoveries",
    description: "Share and discover the latest tracks, albums, and artists",
    memberCount: 15420,
    postCount: 3240,
  };

  // pulled from Firebase posts data
  const [posts, setPosts] = useState([]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getPosts = async (forumID) => {
    try {
        const response = await axios.get(`https://test-spotify-site.local:5050/api/posts/public?forumID=${forumID}`);
        //console.log(response.data);
        setPosts(response.data);
        //return response.data;
    } catch(e){
        console.error("Error fetching posts:", e);
    }    
  }

  useEffect(() => {
    if(forumData.id){
        getPosts(forumData.id);
    }    
  }, [forumData.id]);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "replies":
        return b.replies - a.replies;
      default: // recent
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const handleLikePost = async (postId) => {
    try{
        // console.log(postId);
        const increment = posts.find((p) => p.id === postId).isLiked ? -1 : 1;
        setPosts(
        posts.map((post) =>
            post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                }
            : post
        )
        );

        await axios.patch(
        `https://test-spotify-site.local:5050/api/posts/${postId}/like`,
        { increment },
        { withCredentials: false }
        );
    }catch(e){
        console.error("Failed to update like:", e);
        // Rollback on error (can change later if too laggy)
        setPosts(posts);
    }
    

  };

  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        forumID: forumData.id,
        title: newPost.title,
        content: newPost.content,
        author: "You",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        timestamp: Date.now().toString(),
        likes: 0,
        isLiked: false,
        replies: 0,
        isPinned: false,
        isPopular: false,
        tags: [],
      };

      //sending to ui right now:
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "" });
      setShowNewPostForm(false);
      console.log(params);

      //later, updating the backend stuff:
      axios.post("https://test-spotify-site.local:5050/api/posts/seed", post, { withCredentials: false })
        .then((res) => {
            console.log("Public users response:", res.data);
        })
        .catch((err) => console.error("Seeding error", err));
    }
  };

  return (
    <Box minH="100vh" p={4} bg="black">
      <Box maxW="4xl" mx="auto">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
                borderColor="whiteAlpha.200"
                color="white"
                _hover={{ bg: "whiteAlpha.100" }}
                leftIcon={<ArrowBackIcon />}
              >
                Back to Forums
              </Button>
              <Box flex={1}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {forumData.name}
                </Text>
                <Text color="whiteAlpha.600">{forumData.description}</Text>
              </Box>
            </HStack>

            <HStack spacing={4} fontSize="sm" color="whiteAlpha.600">
              <Text>{forumData.memberCount.toLocaleString()} members</Text>
              <Text>{forumData.postCount.toLocaleString()} posts</Text>
            </HStack>
          </VStack>

          {/* Controls */}
          <Flex direction={{ base: "column", sm: "row" }} gap={4}>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="whiteAlpha.400" />
              </InputLeftElement>
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
                color="white"
                _placeholder={{ color: "whiteAlpha.400" }}
              />
            </InputGroup>
            <HStack spacing={2}>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortBy(
                    sortBy === "recent" ? "popular" : sortBy === "popular" ? "replies" : "recent"
                  )
                }
                borderColor="whiteAlpha.200"
                color="white"
                _hover={{ bg: "whiteAlpha.100" }}
                leftIcon={<Icon as={FaFilter} />}
              >
                {sortBy === "recent" ? "Recent" : sortBy === "popular" ? "Popular" : "Most Replies"}
              </Button>
              <Button
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                bg="spotify.primary"
                color="FFFFFFDE"
                border="1px solid"
                borderColor="white"
                _hover={{ opacity: 0.9 }}
                leftIcon={<Icon as={FaPlus} />}
              >
                New Post
              </Button>
            </HStack>
          </Flex>

          {/* New Post Form */}
          {showNewPostForm && (
            <Card bg="#1a1a1a" border="none">
              <CardHeader>
                <Text color="white" fontWeight="semibold">
                  Create New Post
                </Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Input
                    placeholder="Post title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: "whiteAlpha.400" }}
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: "whiteAlpha.400" }}
                    resize="none"
                    rows={4}
                  />
                  <HStack spacing={2}>
                    <Button
                      onClick={handleCreatePost}
                      bg="spotify.primary"
                      variant="outline"
                      color="white"
                      _hover={{ opacity: 0.9 }}
                    >
                      Post
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewPostForm(false)}
                      borderColor="whiteAlpha.200"
                      color="white"
                      _hover={{ bg: "whiteAlpha.100" }}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Posts */}
          <VStack spacing={4} align="stretch">
            {sortedPosts.map((post) => (
              <Card
                key={post.id}
                bg="#1a1a1a"
                border="none"
                _hover={{ bg: "#222" }}
                transition="background 0.2s"
              >
                <CardHeader pb={3}>
                  <HStack spacing={3} align="flex-start">
                    <Avatar size="md" src={post.authorAvatar} bg="spotify.tertiary" color="white" />
                    <Box flex={1}>
                      <HStack spacing={2} mb={1}>
                        <Text fontWeight="semibold" color="white">
                          {post.title}
                        </Text>
                        {post.isPinned && (
                          <Icon as={FaThumbtack} color="spotify.primary" boxSize={4} />
                        )}
                        {post.isPopular && (
                          <Badge bg="spotify.secondary" color="white">
                            <HStack spacing={1}>
                              <Icon as={FaArrowTrendUp} boxSize={3} />
                              <Text>Popular</Text>
                            </HStack>
                          </Badge>
                        )}
                      </HStack>
                      <HStack spacing={2} fontSize="sm" color="whiteAlpha.600" mb={2}>
                        <Text>{post.author}</Text>
                        <Text>•</Text>
                        <HStack spacing={1}>
                          <Icon as={FaClock} boxSize={3} />
                          <Text>{post.timestamp}</Text>
                        </HStack>
                      </HStack>
                    </Box>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Text color="whiteAlpha.900">{post.content}</Text>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <Wrap spacing={1}>
                        {post.tags.map((tag, index) => (
                          <WrapItem key={index}>
                            <Badge
                              variant="outline"
                              borderColor="whiteAlpha.200"
                              color="whiteAlpha.600"
                              fontSize="xs"
                            >
                              #{tag}
                            </Badge>
                          </WrapItem>
                        ))}
                      </Wrap>
                    )}

                    {/* Actions */}
                    <HStack spacing={4} pt={2}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikePost(post.id)}
                        color="whiteAlpha.600"
                        _hover={{ color: "spotify.primary" }}
                        leftIcon={
                          <Icon as={FaHeart} fill={post.isLiked ? "currentColor" : "none"} />
                        }
                      >
                        {post.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        color="whiteAlpha.600"
                        _hover={{ color: "spotify.primary" }}
                        leftIcon={<Icon as={FaComment} />}
                      >
                        {post.replies}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        color="whiteAlpha.600"
                        _hover={{ color: "spotify.primary" }}
                        leftIcon={<Icon as={FaShare} />}
                      >
                        Share
                      </Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>

          {/* No Results */}
          {sortedPosts.length === 0 && (
            <VStack spacing={4} py={12}>
              <Icon as={FaComment} boxSize={12} color="whiteAlpha.200" />
              <Text fontSize="lg" fontWeight="medium" color="white">
                No posts found
              </Text>
              <Text color="whiteAlpha.600">Try adjusting your search or be the first to post!</Text>
            </VStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
