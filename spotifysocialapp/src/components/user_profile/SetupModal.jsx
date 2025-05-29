import { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  Grid,
  Box,
  VStack,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Image as ChakraImage,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";

export default function SetupModal({
  isOpen,
  onClose,
  user,
  avatar_url,
  setAvatarUrl,
  display_name,
  setDisplayName,
  location,
  setLocation,
  onConfirm,
}) {
  const fileInput = useRef();

  //   const [nameError, setNameError] = useState("");

  const [avatarError, setAvatarError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [createError, setCreateError] = useState("");

  const handleCreateDefault = () => {
    if (!display_name.trim()) {
      setCreateError("Please fill out this field to create a default avatar.");
      return;
    }
    setCreateError("");

    const letter = display_name.trim()[0].toUpperCase();
    const size = 150;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    // darkish green background
    ctx.fillStyle = "#2F855A";
    ctx.fillRect(0, 0, size, size);
    // letter in white, center
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `${size * 0.5}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, size / 2, size / 2);
    // get data-URL and set it
    const dataUrl = canvas.toDataURL("image/png");
    setAvatarUrl(dataUrl);
    setAvatarError("");
  };

  const handleConfirm = () => {
    let valid = true;

    if (!avatar_url) {
      setAvatarError("Please choose/upload an avatar.");
      valid = false;
    } else {
      setAvatarError("");
    }

    if (!display_name.trim()) {
      setCreateError("Please fill out this field.");
      valid = false;
    } else {
      setCreateError("");
    }

    if (!location.trim()) {
      setLocationError("Please fill out this field.");
      valid = false;
    } else {
      setLocationError("");
    }

    if (valid) {
      onConfirm();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#43b164" color="white">
          Set up your profile
          <IconButton
            icon={<CloseIcon />}
            aria-label="Close"
            position="absolute"
            right="8px"
            size="sm"
            variant="ghost"
            _hover={{ bg: "rgba(30, 114, 41, 0.466)" }}
            onClick={onClose}
          />
        </ModalHeader>

        <ModalBody py={4}>
          <Grid templateColumns="1fr 1fr" gap={8}>
            {/* Left side: avatar picker */}
            <VStack spacing={4} align="stretch" w="250px">
              <Box
                role="group"
                w="150px"
                h="150px"
                border="3px solid black"
                borderRadius="full"
                overflow="hidden"
                position="relative"
                cursor="pointer"
                onClick={() => fileInput.current.click()}
                alignSelf="center"
              >
                {avatar_url && (
                  <ChakraImage
                    src={avatar_url}
                    alt="avatar preview"
                    boxSize="150px"
                    objectFit="cover"
                    position="absolute"
                    top="0"
                    left="0"
                  />
                )}
                <Box
                  position="absolute"
                  inset="0"
                  bg="blackAlpha.600"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  opacity={avatar_url ? 0 : 1}
                  _groupHover={{ opacity: 1 }}
                  transition="opacity 0.2s"
                >
                  <EditIcon boxSize={6} mb={1} />
                  <Box fontSize="sm">{avatar_url ? "Change Image" : "Choose Image"}</Box>
                </Box>
              </Box>

              {avatarError && (
                <Text color="red.500" fontSize="sm" textAlign="center">
                  {avatarError}
                </Text>
              )}

              <HStack spacing={2}>
                <Button
                  w="100%"
                  size="sm"
                  bg="black"
                  color="white"
                  _hover={{ bg: "#2d3748" }}
                  onClick={() => {
                    const url = user.images?.[0]?.url || null;
                    setAvatarUrl(url);
                    // clear only if there really *was* a Spotify avatar
                    if (url) setAvatarError("");
                  }}
                >
                  Use Spotify Avatar
                </Button>
                <Button
                  w="50%"
                  size="sm"
                  bg="transparent"
                  color="black"
                  border="1px solid black"
                  _hover={{ bg: "red", color: "white" }}
                  onClick={() => {
                    setAvatarUrl(null);
                    setAvatarError("");
                  }}
                >
                  Clear
                </Button>
              </HStack>

              <Button
                w="100%"
                bg="green.700"
                color="white"
                _hover={{ bg: "green.600" }}
                onClick={handleCreateDefault}
              >
                Create Default
              </Button>

              <Input
                type="file"
                accept="image/*"
                ref={fileInput}
                display="none"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    const img = new window.Image();
                    img.src = reader.result;

                    img.onload = () => {
                      // set a max width or height
                      const MAX_DIM = 500;
                      const scale = Math.min(MAX_DIM / img.width, MAX_DIM / img.height, 1);
                      const w = img.width * scale;
                      const h = img.height * scale;

                      const canvas = document.createElement("canvas");
                      canvas.width = w;
                      canvas.height = h;
                      canvas.getContext("2d").drawImage(img, 0, 0, w, h);

                      // quality between 0.5–0.8 gives good results without huge size
                      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
                      setAvatarUrl(compressedDataUrl);
                      setAvatarError("");
                    };
                  };
                  // clear input so same file retriggers onChange
                  e.target.value = "";
                }}
              />
            </VStack>

            {/* Right side: name & location form */}
            <Box bg="gray.400" p={6} borderRadius="md">
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={!!createError}>
                  <FormLabel color="white">Display Name</FormLabel>
                  <Input
                    bg="white"
                    value={display_name}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      if (createError) setCreateError("");
                    }}
                  />
                  <FormErrorMessage>{createError}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!locationError}>
                  <FormLabel color="white">Location</FormLabel>
                  <Input
                    bg="white"
                    placeholder="City, State or Country"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (locationError) setLocationError("");
                    }}
                  />
                  <FormErrorMessage>{locationError}</FormErrorMessage>
                </FormControl>
              </VStack>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={handleConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
