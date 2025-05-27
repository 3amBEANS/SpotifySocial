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
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (label) => {
    navigate(`/${label.toLowerCase()}`);
  };

  return (
    <Box as="header" className="header">
      <Flex className="navbar-container">
        {/* Logo flush left */}
        <Box className="logo">
          <HStack spacing={2}>
            <Link to="/home"><Text className="logo-text">Spotify Connect</Text></Link>
          </HStack>
        </Box>

        {/* Nav absolutely centered */}
        <Box className="nav">
          <HStack spacing={6}>
            {["Profile", "Discover", "Library", "Forum", "Inbox"].map((label) => (
              <Button key={label} className="nav-button" onClick={() => handleNavigation(label)}>
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
          href="https://test-spotify-site.local:5050/logout"
          size="sm"
          className="logout-button"
        >
          Log out
        </Button>
      </Flex>
    </Box>
  );
}
