import {
  Card,
  CardHeader,
  CardBody,
  HStack,
  Icon,
  Text,
  Badge,
  VStack,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function TopArtistsCard({ data }) {
  return (
    <Card bg="#1a1a1a" border="none">
      <CardHeader>
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaUsers} color="spotify.primary" />
            <Text color="white" fontWeight="semibold">
              Top Artists
            </Text>
          </HStack>
          <Badge bg="spotify.primary" color="black">
            <HStack spacing={1}>
              <Icon as={FaArrowTrendUp} boxSize={3} style={{ color: "white" }} />
              <Text style={{ color: "white" }}>This Month</Text>
            </HStack>
          </Badge>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack spacing={3} align="stretch">
          {data.map((artist, i) => (
            <HStack
              key={i}
              spacing={3}
              p={2}
              borderRadius="lg"
              _hover={{ bg: "whiteAlpha.100" }}
              transition="background 0.2s"
            >
              <Text color="whiteAlpha.600" fontFamily="mono" fontSize="sm" w={6}>
                {i + 1}
              </Text>
              <Avatar size="md" src={artist.image} bg="spotify.tertiary" color="white" />
              <Box flex={1}>
                <Text fontWeight="medium" color="white">
                  {artist.name}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.600">
                  {artist.followers} followers
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
