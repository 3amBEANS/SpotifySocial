import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/Navbar.css";



export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // nav labels in order
  const navItems = ["Profile", "Discover", "Library", "Forum", "Inbox"];

  // Decide if a given label is "active"
  const isActive = (label) => {
    if (label === "Library") {
      return pathname.startsWith("/library");
    }
    return pathname === `/${label.toLowerCase()}`;
  };

  const handleNavigation = (label) => {
    if (label === "Library") {
      navigate(`/library/liked-songs`);
    } else {
      navigate(`/${label.toLowerCase()}`);
    }
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

        {/* vertical divider */}
        <Box className="logo-divider" />

        {/* Nav absolutely centered */}
        <HStack spacing={4} className="nav-links">
          {navItems.map((label) => {
            return (
              <Button
                key={label}
                className={`nav-link ${isActive(label) ? "active" : ""}`}
                onClick={() => handleNavigation(label)}
              >
                {label}
              </Button>
            );
          })}
        </HStack>

        {/* spacer */}
        <Box className="spacer" />

        {/* Search flush right */}
        <Box className="search-container">
          {searchOpen ? (
            /* full search bar */
            <InputGroup className="search-expanded">
              <InputLeftElement className="search-icon">
                <SearchIcon />
              </InputLeftElement>

              <Input
                placeholder="Search in site"
                className="search-input"
                onBlur={() => setSearchOpen(false)}
                autoFocus
              />
            </InputGroup>
          ) : (
            /* just the icon button */
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              className="search-button"
              onClick={() => setSearchOpen(true)}
            />
          )}
        </Box>

        {/* Logout */}
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
