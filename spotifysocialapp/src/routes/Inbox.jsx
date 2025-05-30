import { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { MdSend, MdChatBubble } from "react-icons/md";
import MessageForm from "../components/MessageForm";
import ChatList from "../components/ChatList";

export default function Inbox() {
  const [view, setView] = useState("send");

  return (
    <Flex minHeight="100vh">
      {/* Sidebar */}
      <Box bg="#1b1b1b" p={4} minW="200px" height="100vh">
        <VStack align="start" spacing={6}>
          <Text fontWeight="bold" fontSize="lg">Messages</Text>

          <Box
            display="flex"
            alignItems="center"
            p={2}
            borderRadius="md"
            onClick={() => setView("send")}
            _hover={{
              bg: "gray.100",
              color: "#43b164",
              cursor: "pointer",
            }}
            bg={view === "send" ? "gray.800" : "transparent"}
            color={view === "send" ? "#43b164" : "white"}
            w="100%"
          >
            <Icon as={MdSend} mr={2} />
            <Text>Send Message</Text>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            p={2}
            borderRadius="md"
            onClick={() => setView("chats")}
            _hover={{
              bg: "gray.100",
              color: "#43b164",
              cursor: "pointer",
            }}
            bg={view === "chats" ? "gray.800" : "transparent"}
            color={view === "chats" ? "#43b164" : "white"}
            w="100%"
          >
            <Icon as={MdChatBubble} mr={2} />
            <Text>All Chats</Text>
          </Box>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="gray.900" color="white" px={10} py={10}>
        <Box textAlign="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">
            {view === "send" ? "Send a Message" : "Your Chats"}
          </Text>
          <Text mt={1} fontSize="md" color="gray.300">
            Connect with other music lovers.
          </Text>
        </Box>

        {view === "send" ? <MessageForm /> : <ChatList />}
      </Box>
    </Flex>
  );
}



