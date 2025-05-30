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
    <>
    </>
  );
}

