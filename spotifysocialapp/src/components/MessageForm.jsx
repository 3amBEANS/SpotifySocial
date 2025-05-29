import { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Select,
  Text,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function MessageForm() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"), where("isPublic", "==", true));
        const snapshot = await getDocs(q);
        const userList = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((u) => u.id !== user.id);
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  const handleSend = async () => {
    if (!recipient || !message) return;
    try {
      await addDoc(collection(db, "messages"), {
        from: user.id,
        to: recipient,
        message,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleCancel = () => {
    setRecipient("");
    setMessage("");
  };

  return (
    <Box flex="1" bg="gray.900" color="white">
      <Box p={10} maxW="800px">
        <Heading size="md" mb={4}>
          Send a Message
        </Heading>

        <VStack spacing={4} align="start">
          <Box w="100%">
            <Text mb={1}>To</Text>
            <Select
              placeholder="Select a recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              bg="white"
              color="black"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name || u.display_name || "Unnamed User"}
                </option>
              ))}
            </Select>
            <Text fontSize="sm" color="gray.400">
              Choose someone to message.
            </Text>
          </Box>

          <Box w="100%">
            <Text mb={1}>Message</Text>
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              bg="white"
              color="black"
            />
            <Text fontSize="sm" color="gray.400">
              No spam or inappropriate content!
            </Text>
          </Box>

          <HStack pt={4}>
            <Button
              variant="outline"
              borderColor="white"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={handleSend}
            >
              Send
            </Button>
            <Button
              variant="outline"
              borderColor="white"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
