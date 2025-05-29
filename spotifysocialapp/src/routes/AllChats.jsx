import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Box, Heading, Text, VStack, Spinner, Flex } from "@chakra-ui/react";
import { db } from "../firebase";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function AllChats() {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, "messages"),
          where("participants", "array-contains", user.id),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const chatList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch all user names
        const usersSnapshot = await getDocs(collection(db, "users"));
        const userMap = {};
        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          userMap[doc.id] = data.display_name || data.name || "Unknown";
        });

        setUsersMap(userMap);
        setChats(chatList);
      } catch (err) {
        console.error("Error fetching chats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMessages();
  }, [user]);

  return (
    <Box p={10} bg="gray.900" color="white" minHeight="100vh">
      <Box bg="green.700" py={6} px={10} mb={6}>
        <Heading size="lg" textAlign="center">All Chats</Heading>
        <Text textAlign="center">See messages you've sent and received.</Text>
      </Box>

      {loading ? (
        <Flex justify="center" mt={10}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <VStack spacing={6} align="stretch">
          {chats.map((chat) => {
            const otherUserId = chat.from === user.id ? chat.to : chat.from;
            return (
              <Box
                key={chat.id}
                p={4}
                bg="gray.700"
                borderRadius="md"
                cursor="pointer"
                onClick={() => navigate(`/inbox?to=${otherUserId}`)}
              >
                <Text fontWeight="bold">
                  {chat.from === user.id
                    ? `To ${usersMap[chat.to] || "Unknown"}`
                    : `From ${usersMap[chat.from] || "Unknown"}`}
                </Text>
                <Text mt={2}>{chat.message}</Text>
                <Text fontSize="xs" color="gray.400">
                  {chat.timestamp?.toDate?.().toLocaleString?.() || ""}
                </Text>
              </Box>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}
