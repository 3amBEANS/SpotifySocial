import { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
  Heading
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

          {/* Send Message Button */}
          <Box
            display="flex"
            alignItems="center"
            p={2}
            borderRadius="md"
            onClick={() => setView("send")}
            _hover={{
              bg: "white",
              color: "#43b164",
              cursor: "pointer",
            }}
            bg={view === "send" ? "white" : "transparent"}
            color={view === "send" ? "black" : "white"}
            w="100%"
            fontWeight={"bold"}
            fontSize={20}
          >
            <Icon as={MdSend} mr={2} />
            <Text>Send Message</Text>
          </Box>
          {/* All Chats Button */}
          <Box
            display="flex"
            alignItems="center"
            p={2}
            borderRadius="md"
            onClick={() => setView("chats")}
            _hover={{
              bg: "white",
              color: "#43b164",
              cursor: "pointer",
            }}
            bg={view === "chats" ? "white" : "transparent"}
            color={view === "chats" ? "black" : "white"}
            w="100%"
            fontWeight={"bold"}
            fontSize={20}
          >
            <Icon as={MdChatBubble} mr={2} />
            <Text>All Chats</Text>
          </Box>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" color="white" px={10} py={10}>
        <Box textAlign="center" mb={6}>
          <Heading mb={2}>
            {view === "send" ? "Send a Message" : "Your Chats"}
          </Heading>
          <Text mt={1} fontSize="md" color="gray.300">
            Connect with other music lovers.
          </Text>
        </Box>

        {view === "send" ? <MessageForm /> : <ChatList />}
      </Box>
    </Flex>
  );
}



