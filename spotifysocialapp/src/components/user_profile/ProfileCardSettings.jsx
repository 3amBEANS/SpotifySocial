import { VStack, Text, Flex, Box, Switch } from "@chakra-ui/react";

export default function ProfileCardSettings({
  isPrivate,
  showTopArtists,
  showTopSongs,
  showLikedSongs,
  onTogglePrivate,
  onToggleShowTopArtists,
  onToggleShowTopSongs,
  onToggleShowLikedSongs,
}) {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="white">
        Privacy & Display Settings
      </Text>
      {/** each switch row **/}
      <Flex justify="space-between" align="center">
        <Box>
          <Text color="white" fontWeight="medium">
            Private Profile
          </Text>
          <Text fontSize="sm" color="whiteAlpha.600">
            Hide your profile from public discovery
          </Text>
        </Box>
        <Switch
          isChecked={isPrivate}
          onChange={(e) => onTogglePrivate(e.target.checked)}
          colorScheme="green"
        />
      </Flex>
      <Flex justify="space-between" align="center">
        <Box>
          <Text color="white" fontWeight="medium">
            Show Top Artists
          </Text>
          <Text fontSize="sm" color="whiteAlpha.600">
            Display your most played artists
          </Text>
        </Box>
        <Switch
          isChecked={showTopArtists}
          onChange={(e) => onToggleShowTopArtists(e.target.checked)}
          colorScheme="green"
        />
      </Flex>
      <Flex justify="space-between" align="center">
        <Box>
          <Text color="white" fontWeight="medium">
            Show Top Songs
          </Text>
          <Text fontSize="sm" color="whiteAlpha.600">
            Display your most played tracks
          </Text>
        </Box>
        <Switch
          isChecked={showTopSongs}
          onChange={(e) => onToggleShowTopSongs(e.target.checked)}
          colorScheme="green"
        />
      </Flex>
      <Flex justify="space-between" align="center">
        <Box>
          <Text color="white" fontWeight="medium">
            Show Liked Songs
          </Text>
          <Text fontSize="sm" color="whiteAlpha.600">
            Display your liked tracks collection
          </Text>
        </Box>
        <Switch
          isChecked={showLikedSongs}
          onChange={(e) => onToggleShowLikedSongs(e.target.checked)}
          colorScheme="green"
        />
      </Flex>
    </VStack>
  );
}
