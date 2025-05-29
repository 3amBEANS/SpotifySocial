import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MessagePage() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log("Send to:", recipient);
    console.log("Message:", message);
  };

  const handleCancel = () => {
    setRecipient("");
    setMessage("");
  };

  return (
    <Flex minHeight="100vh">
      {/* Sidebar */}
      <Box bg="gray.100" w="220px" p={4}>
        <VStack spacing={4} align="stretch">
          <Button colorScheme="green" variant="solid">
            Send Message
          </Button>
          <Button variant="ghost">All Chats</Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="gray.900" color="white">
        <Box bg="green.700" py={6} px={10}>
          <Heading size="lg"><center>Your Messages</center></Heading>
          <Text mt={1}><center>Connect with other music lovers.</center></Text>
        </Box>

        <Box p={10}>
          <Heading size="md" mb={4}>
            Send a Message
          </Heading>

          <VStack spacing={4} align="start">
            <Box w="100%">
              <Text mb={1}>To</Text>
              <Input
                placeholder="Enter username"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <Text fontSize="sm" color="gray.400">
                Type the username of the person you wish to message.
              </Text>
            </Box>

            <Box w="100%">
              <Text mb={1}>Message</Text>
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Text fontSize="sm" color="gray.400">
                No spam or inappropriate content!
              </Text>
            </Box>

            <HStack pt={4}>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSend}>
                Send
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}

