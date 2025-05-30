import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  HStack,
  Text,
  VStack,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ExternalLinkIcon, CloseIcon } from "@chakra-ui/icons";
import { FaSpotify } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import SpotifyLogo from "../assets/spotify.png";
import "../styles/loginPage.css";

export default function LoginModal({ isOpen, onClose }) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <Box className="login-container">
          {/* Header bar */}
          <Box className="login-header">
            <IconButton
              aria-label="Close login modal"
              icon={<CloseIcon />}
              onClick={onClose}
              position="absolute"
              top="8px"
              right="8px"
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "rgba(30, 114, 41, 0.466)" }}
            />
            <HStack spacing={2} align="center">
              <FaSpotify className="login-header-icon" />
              <Text className="login-header-text">Welcome to Spotify Connect</Text>
            </HStack>
          </Box>

          {/* Content */}
          <VStack className="login-content">
            {/* Sign-in section */}
            <VStack className="login-section">
              <Heading className="login-heading">
                Sign In with <img src={SpotifyLogo} alt="Spotify logo" className="spotify-logo" />
                Spotify
              </Heading>
              <Text className="login-text">
                Access your favorite music and playlists by signing in with your Spotify account.
              </Text>
              <Button
                as="a"
                href="https://test-spotify-site.local:5050/login"
                className="login-button"
              >
                Sign in with Spotify <ExternalLinkIcon />
              </Button>
            </VStack>

            <Divider className="login-divider" />

            {/* Register section */}
            <VStack className="login-section">
              <Heading className="login-heading">Don't have a Spotify Account?</Heading>
              <Text className="login-text">Creating a Spotify account is free!</Text>
              <Button
                as="a"
                href="https://www.spotify.com/us/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="login-button"
              >
                Register <ExternalLinkIcon />
              </Button>
            </VStack>
          </VStack>
        </Box>
      </ModalContent>
    </Modal>
  );
}
