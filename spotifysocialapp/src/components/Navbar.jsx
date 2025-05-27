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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider as ChakraDivider,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { IoLibrary } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // Single list of nav labels, with Library at index 2
  const navItems = ["Profile", "Discover", "Library", "Forum", "Inbox"];

  const libraryPaths = ["/library", "/userlikedsongs", "/usertopartists", "/usertopsongs"];
  const isActive = (label) => {
    const route = `/${label.toLowerCase()}`;
    if (label === "Library") {
      return libraryPaths.some((p) => pathname.startsWith(p));
    }
    return pathname === route;
  };

  return (
    <Box as="header" className="header">
      <Flex className="navbar-container">
        {/* Logo flush left */}
        <Box className="logo">
          <Text className="logo-text">Spotify Connect</Text>
        </Box>

        {/* vertical divider */}
        <Box className="logo-divider" />

        {/* Nav absolutely centered */}
        <HStack spacing={4} className="nav-links">
          {navItems.map((label) => {
            // Library needs dropdown
            if (label === "Library") {
              return (
                <Menu key={label}>
                  <MenuButton as={Button} className={`nav-link ${isActive(label) ? "active" : ""}`}>
                    <Box display="inline-flex" alignItems="center">
                      {label}
                      <ChevronDownIcon className="chevron-icon" />
                    </Box>
                  </MenuButton>

                  <MenuList className="menu-list">
                    <MenuItem className="menu-item" onClick={() => navigate("/library")}>
                      <IoLibrary />
                      <Text className="menu-item-title">My Library</Text>
                      <Text className="menu-item-desc">View your full library</Text>
                    </MenuItem>

                    <ChakraDivider className="menu-divider" />
                    <MenuItem className="menu-item" onClick={() => navigate("/userlikedsongs")}>
                      <Text className="menu-item-title">Liked Songs</Text>
                      <Text className="menu-item-desc">Your saved tracks</Text>
                    </MenuItem>

                    <ChakraDivider className="menu-divider" />
                    <MenuItem className="menu-item" onClick={() => navigate("/usertopartists")}>
                      <Text className="menu-item-title">Top Artists</Text>
                      <Text className="menu-item-desc">Your most-played artists</Text>
                    </MenuItem>

                    <ChakraDivider className="menu-divider" />
                    <MenuItem className="menu-item" onClick={() => navigate("/usertopsongs")}>
                      <Text className="menu-item-title">Top Songs</Text>
                      <Text className="menu-item-desc">Your most-played songs</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              );
            }

            // All other items (including Profile)
            return (
              <Button
                key={label}
                className={`nav-link ${isActive(label) ? "active" : ""}`}
                onClick={() => navigate(`/${label.toLowerCase()}`)}
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
