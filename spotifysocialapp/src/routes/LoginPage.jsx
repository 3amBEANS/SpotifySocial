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

export default function LoginPage() {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box
        w="full"
        maxW="400px"
        bg="gray.50" // light container
        borderRadius="md"
        overflow="hidden"
        boxShadow="lg"
      >
        {/* Header bar */}
        <Box bg="#43b164" px={6} py={4}>
          <HStack spacing={2}>
            <Circle size="10px" bg="green.800" />
            <Text fontSize="lg" fontWeight="bold" color="white">
              Welcome to Spotify Connect
            </Text>
          </HStack>
        </Box>

        {/* Content */}
        <VStack spacing={6} px={6} py={8} color="black">
          {/* Sign-in section */}
          <VStack spacing={4} w="full">
            <Heading size="md" textAlign="center">
              Sign In with Spotify
            </Heading>
            <Text textAlign="center" fontSize="sm">
              Access your favorite music and playlists by signing in with your Spotify account.
            </Text>
            <Button size="md" bg="black" color="white" w="full" _hover={{ bg: "gray.800" }}>
              Sign in with Spotify
            </Button>
          </VStack>

          <Divider />

          {/* Register section */}
          <VStack spacing={4} w="full">
            <Heading size="md" textAlign="center">
              Don't have a Spotify Account?
            </Heading>
            <Text textAlign="center" fontSize="sm">
              Creating a Spotify account is free!
            </Text>
            <Button size="md" bg="black" color="white" w="full" _hover={{ bg: "gray.800" }}>
              Register
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
}
