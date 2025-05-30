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
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";

export default function MessagePage() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  const handleSend = async () => {
    if (!recipient || !message) return;
    try {
      await axios.post("/api/messages/send", {
        from: user.id,
        to: recipient,
        message,
      });
      setMessage("");
      setRecipient("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleCancel = () => {
    setRecipient("");
    setMessage("");
  };

  return (
<<<<<<< HEAD
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
        <Box bg="transparent" py={6} px={10}>
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
                placeholder="Enter user ID"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <Text fontSize="sm" color="gray.400">
                Paste the user ID you wish to message.
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
=======
    <>
    </>
>>>>>>> c0b4911e7eac57977707694b25e873ce61c3a7fa
  );
}

