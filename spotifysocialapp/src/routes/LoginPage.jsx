import {
  Flex,
  Box,
  HStack,
  Circle,
  Text,
  VStack,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import "../styles/loginPage.css";

export default function LoginPage() {
  return (
    <Flex className="login-page">
      <Box className="login-container">
        {/* Header bar */}
        <Box className="login-header">
          <HStack>
            <Circle className="login-header-circle" />
            <Text className="login-header-text">Welcome to Spotify Connect</Text>
          </HStack>
        </Box>

        {/* Content */}
        <VStack className="login-content">
          {/* Sign-in section */}
          <VStack className="login-section">
            <Heading className="login-heading">Sign In with Spotify</Heading>
            <Text className="login-text">
              Access your favorite music and playlists by signing in with your Spotify account.
            </Text>
            <Button
              as="a"
              href="https://test-spotify-site.local:5050/login"
              className="login-button"
            >
              Sign in with Spotify
            </Button>
          </VStack>

          <Divider className="login-divider" />

          {/* Register section */}
          <VStack className="login-section">
            <Heading className="login-heading">Don't have a Spotify Account?</Heading>
            <Text className="login-text">Creating a Spotify account is free!</Text>
            <Button className="login-button">Register</Button>
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
}
