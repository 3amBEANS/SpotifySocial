import { useState } from "react";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import MessageForm from "../components/MessageForm";
import ChatList from "../components/ChatList";

export default function Inbox() {
  const [view, setView] = useState("send");

  return (
    <Flex minHeight="100vh">
      {/* Sidebar */}
      <Box bg="gray.100" w="220px" p={4}>
        <VStack spacing={4} align="stretch">
          <Button
            colorScheme={view === "send" ? "green" : "gray"}
            onClick={() => setView("send")}
          >
            Send Message
          </Button>
          <Button
            colorScheme={view === "chats" ? "green" : "gray"}
            onClick={() => setView("chats")}
          >
            All Chats
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="gray.900" color="white">
        <Box bg="green.700" py={6} px={10}>
          <Box textAlign="center">
            <Box as="h2" fontSize="2xl" fontWeight="bold">
              {view === "send" ? "Your Messages" : "Your Inbox"}
            </Box>
            <Box mt={1} fontSize="md">
              Connect with other music lovers.
            </Box>
          </Box>
        </Box>

        <Box p={10}>{view === "send" ? <MessageForm /> : <ChatList />}</Box>

        <Box
          textAlign="center"
          fontSize="sm"
          color="gray.500"
          py={6}
          borderTop="1px solid #2d3748"
        >
        </Box>
      </Box>
    </Flex>
  );
}

