import { Card, CardHeader, CardBody, HStack, Icon, Text, Badge } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

export default function LikedSongsCard({ count = 0 }) {
  return (
    <Card bg="#1a1a1a" border="none">
      <CardHeader>
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaHeart} color="spotify.primary" />
            <Text color="white" fontWeight="semibold">
              Liked Songs
            </Text>
          </HStack>
          <Badge bg="spotify.primary" color="white">
            {count} songs
          </Badge>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color="whiteAlpha.600" textAlign="center" py={8}>
          Your liked songs collection will appear here when you enable this feature.
        </Text>
      </CardBody>
    </Card>
  );
}
