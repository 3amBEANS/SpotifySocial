import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Tag,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

export default function Discover() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://localhost:5050/api/users/public", { withCredentials: false })
      .then((res) => {
        console.log("Public users response:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error("Error loading users", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={6}>
      <VStack spacing={4} textAlign="center">
        <Heading size="lg">Connect with Music Lovers</Heading>
        <Text>Explore public profiles and start conversations with fellow music fans.</Text>
      </VStack>

      {loading ? (
        <Flex justify="center" mt={8}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <VStack spacing={6} mt={8}>
          {users.map((user) => (
            <Box
              key={user.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              w="100%"
              maxW="600px"
              bg="gray.50"
              boxShadow="md"
            >
              <Flex align="center">
                <Avatar name={user.name} src={user.avatar} size="lg" mr={4} />
                <Box flex="1">
                  <Text fontWeight="bold">{user.name}</Text>
                  <HStack spacing={2} mt={1}>
                    {user.tags?.map((tag) => (
                      <Tag key={tag} colorScheme="green">
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                  <Text mt={2}>{user.bio || "Avid listener and promoter of great music."}</Text>
                </Box>
                <VStack ml={4}>
                  <Button size="sm" colorScheme="gray">
                    Message User
                  </Button>
                  <Button size="sm" colorScheme="blackAlpha">
                    View Public Profile
                  </Button>
                </VStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
