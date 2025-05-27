import LibrarySidebar from "../components/LibrarySidebar";
import { Box, Flex } from '@chakra-ui/react';

export default function Library() {
    return (
      <Flex className="liked-songs-page">
      <LibrarySidebar />
      <Box flex="1" p={8} className="content-area">
        <div>This is the Library Page!! Navigate to the Liked Songs page using the Side bar.
        </div>
      </Box>
    </Flex>
    );
  }
  