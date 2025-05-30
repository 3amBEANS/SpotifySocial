import { useState, useContext, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Avatar,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import LoginModal from "./LoginModal";
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
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // const [isOpeningProfile, setIsOpeningProfile] = useState(false);

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

  useEffect(() => {
    if (!isLoggingOut) return;
    const timer = setTimeout(() => {
      logout();
      navigate("/"); // send them home
      setIsLoggingOut(false); // hide the spinner
    }, 600);
    return () => clearTimeout(timer);
  }, [isLoggingOut, logout, navigate]);

  // useEffect(() => {
  //   if (!isOpeningProfile) return;
  //   const timer = setTimeout(() => {
  //     navigate("/profile");
  //     setIsOpeningProfile(false);
  //   }, 600);
  //   return () => clearTimeout(timer);
  // }, [isOpeningProfile, navigate]);

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
                onClick={() => setConfirmLogoutOpen(true)}
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

      <Modal isOpen={confirmLogoutOpen} onClose={() => setConfirmLogoutOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent maxW="sm">
          <ModalHeader>Confirm Logout</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to log out?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setConfirmLogoutOpen(false)}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                setConfirmLogoutOpen(false);
                setIsLoggingOut(true);
              }}
            >
              Yes, log me out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isLoggingOut && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="#0f0e17"
          align="center"
          justify="center"
          zIndex="9999"
        >
          <Spinner size="xl" color="white" />
        </Flex>
      )}
    </>
  );
}
