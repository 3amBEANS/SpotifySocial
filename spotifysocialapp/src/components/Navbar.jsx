import { useState, useContext, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  // IconButton,
  // InputGroup,
  // InputLeftElement,
  // Input,
  Avatar,
} from "@chakra-ui/react";
import LoginModal from "./LoginModal";
// import { SearchIcon } from "@chakra-ui/icons";
import { FaSpotify } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useContext(AuthContext);

  const [profileSetup, setProfileSetup] = useState(false);
  const [navAvatarUrl, setNavAvatarUrl] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  // const [searchOpen, setSearchOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Fetch isProfileSetup so we know if user signed
  useEffect(() => {
    if (!user) {
      setProfileSetup(false);
      setNavAvatarUrl(null);
      return;
    }
    axios
      .get(`/api/users/${user.id}`)
      .then((res) => {
        setProfileSetup(!!res.data.isProfileSetup);
        setNavAvatarUrl(res.data.avatar_url || null);
      })
      .catch(() => {
        setProfileSetup(false);
        setNavAvatarUrl(null);
      });
  }, [user, pathname]);

  // Hide header on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current) {
        // scrolling up
        setShowHeader(true);
      } else if (currentY > lastScrollY.current) {
        // scrolling down
        setShowHeader(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // nav labels in order
  const navItems = ["Discover", "Library", "Forum", "Inbox"];

  // Decide if a given label is "active"
  const isActive = (label) =>
    label === "Library" ? pathname.startsWith("/library") : pathname === `/${label.toLowerCase()}`;

  // All links go to login modal if not logged in
  const handleNavigation = (label) => {
    if (!profileSetup) {
      setLoginOpen(true);
      return;
    }
    if (label === "Library") {
      navigate("/library/liked-songs");
    } else {
      navigate(`/${label.toLowerCase()}`);
    }
  };

  return (
    <>
      <Box as="header" className={`header ${showHeader ? "" : "hidden"}`}>
        <Flex className="navbar-container">
          {/* Logo flush left */}
          <Box className="logo">
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <FaSpotify className="logo-icon" />
              <Text className="logo-text">Spotify Connect</Text>
            </Link>
          </Box>

          {/* vertical divider */}
          <Box className="logo-divider" />

          {/* Nav Links */}
          <HStack className="nav-links">
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
          {/* <Box className="search-container">
            {searchOpen ? (
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
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                className="search-button"
                onClick={() => setSearchOpen(true)}
              />
            )}
          </Box> */}

          {/* Profile / Sign In toggle */}
          {profileSetup ? (
            <>
              <Link to="/profile" className="avatar-link">
                <Avatar src={navAvatarUrl || undefined} name={user?.display_name ?? ""} size="sm" />
              </Link>

              {/* vertical line between avatar & logout */}
              <Box className="avatar-divider" />

              <Button
                size="sm"
                className="logout-button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <MdOutlineLogout />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Box className="avatar-divider" />

              <Button size="sm" className="signin-button" onClick={() => setLoginOpen(true)}>
                Sign In <MdOutlineLogin />
              </Button>
            </>
          )}
        </Flex>
      </Box>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
