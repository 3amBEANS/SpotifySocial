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
    <>
    </>
  );
}

