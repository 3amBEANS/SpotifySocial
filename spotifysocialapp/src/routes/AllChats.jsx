import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Heading, Text, VStack, Spinner, Flex } from "@chakra-ui/react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function AllChats() {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const msgRes = await axios.get("https://test-spotify-site.local:5050/api/messages");
        const allMsgs = msgRes.data || [];
        console.log(allMsgs)
        // Filter messages for the logged-in user (sent or received)
        const relevant = allMsgs.filter(
          (msg) => msg.from === user.id || msg.to === user.id
        );

        setChats(relevant);

        // Collect all user IDs mentioned in messages
        const ids = new Set(relevant.map((msg) => msg.from).concat(relevant.map((msg) => msg.to)));

        const userRes = await axios.get("https://test-spotify-site.local:5050/api/users/public");
        const map = {};
        userRes.data.forEach((u) => {
          map[u.id] = u.display_name || u.name || "Unnamed User";
        });

        setUsersMap(map);
      } catch (err) {
        console.error("Error loading chats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchChats();
  }, [user]);

  return (
    <Box p={10} bg="gray.900" color="white" minHeight="100vh">
      <Box bg="green.700" py={6} px={10} mb={6}>
        <Heading size="lg" textAlign="center">All Messages</Heading>
        <Text textAlign="center">See your conversation history.</Text>
      </Box>

      {loading ? (
        <Flex justify="center" mt={10}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <VStack spacing={6} align="stretch">
          {chats.map((chat) => {
            const otherUserId = chat.from === user.id ? chat.to : chat.from;
            const label =
              chat.from === user.id
                ? `To ${usersMap[chat.to] || "Unknown"}`
                : `From ${usersMap[chat.from] || "Unknown"}`;
            return (
              <Box
                key={chat.id}
                p={4}
                bg="gray.700"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: "gray.600" }}
                onClick={() => navigate(`/inbox?to=${otherUserId}`)}
              >
                <Text fontWeight="bold">{label}</Text>
                <Text mt={2}>{chat.message}</Text>
                <Text fontSize="xs" color="gray.400">
                  {new Date(chat.timestamp).toLocaleString()}
                </Text>
              </Box>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}

