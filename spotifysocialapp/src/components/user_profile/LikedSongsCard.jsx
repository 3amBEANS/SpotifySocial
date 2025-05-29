import { Card, CardHeader, CardBody, HStack, VStack, Icon, Text, Avatar, Flex, Box } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

export default function LikedSongsCard({ data }) {
  return (
    <Card bg="#1a1a1a" border="none">
      <CardHeader>
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaHeart} color="white" />
            <Text color="white" fontWeight="semibold">
              Recently Liked Songs
            </Text>
          </HStack>
        </HStack>
      </CardHeader>

      <CardBody>
        
        <VStack spacing={3} align="stretch">
          {data.map((song, i) => (
            <HStack
              key={i}
              spacing={3}
              p={2}
              borderRadius="lg"
              _hover={{ bg: "whiteAlpha.100" }}
              transition="background 0.2s"
            >
              <Flex
                w={12}
                h={12}
                borderRadius="lg"
                bg="spotify.primary"
                align="center"
                justify="center"
              >
                <Avatar size="md" src={song.image || `https://via.placeholder.com/300?text=Album+art+of+${song.title}`} bg="spotify.tertiary" color="white" />
              </Flex>
              <Box flex={1}>
                <Text fontWeight="medium" color="white">
                  {song.title}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.800">
                  {song.artist}
                </Text>
                <Text fontSize="sm" fontWeight="sm" color="whiteAlpha.600">
                  {song.album}
                </Text>
              </Box>
             
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
