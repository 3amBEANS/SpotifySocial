import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <Box as="header" className="header">
      <Flex className="navbar-container">
        {/* Logo flush left */}
        <Box className="logo">
          <HStack spacing={2}>
            <Text className="logo-text">Spotify Connect</Text>
          </HStack>
        </Box>

        {/* Nav absolutely centered */}
        <Box className="nav">
          <HStack spacing={6}>
            {["Home", "Discover", "Library", "Forum", "Inbox"].map((label) => (
              <Button key={label} className="nav-button">
                {label}
              </Button>
            ))}
          </HStack>
        </Box>

        {/* Search flush right */}
        <Box className="search">
          <InputGroup className="search-group">
            <InputLeftElement className="search-icon">
              <SearchIcon />
            </InputLeftElement>
            <Input className="search-input" placeholder="Search in site" />
          </InputGroup>
        </Box>
        <Button
          as="a"
          href="https://test-spotify-site.local:5000/logout"
          size="sm"
          className="logout-button"
        >
          Log out
        </Button>
      </Flex>
    </Box>
  );
}
