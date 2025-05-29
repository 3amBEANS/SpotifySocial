import React, { useEffect, useState, useContext } from "react";
import { Box, VStack, Text, Spinner, Heading, Divider } from "@chakra-ui/react";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

export default function ChatList() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCache, setUserCache] = useState({});

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", user.id),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const enriched = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const msg = docSnap.data();

          // Helper to get display_name by ID
          const getDisplayName = async (uid) => {
            if (userCache[uid]) return userCache[uid];
            const ref = doc(db, "users", uid);
            const snap = await getDoc(ref);
            const name = snap.exists() ? snap.data().display_name : "Unknown";
            setUserCache((prev) => ({ ...prev, [uid]: name }));
            return name;
          };

          const fromName = await getDisplayName(msg.from);
          const toName = await getDisplayName(msg.to);

          return {
            id: docSnap.id,
            ...msg,
            fromName,
            toName,
          };
        })
      );

      setMessages(enriched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading size="md" mb={4}>
        All Messages
      </Heading>
      <Divider mb={4} />
      <VStack spacing={4} align="stretch">
        {messages.length === 0 ? (
          <Text color="gray.400">No messages yet.</Text>
        ) : (
          messages.map((msg) => (
            <Box key={msg.id} p={4} bg="gray.700" borderRadius="md">
              <Text fontWeight="bold">
                {msg.from === user.id ? `To ${msg.toName}` : `From ${msg.fromName}`}
              </Text>
              <Text mt={1}>{msg.message}</Text>
              <Text fontSize="xs" color="gray.400" mt={2}>
                {new Date(msg.timestamp?.toDate()).toLocaleString()}
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}

