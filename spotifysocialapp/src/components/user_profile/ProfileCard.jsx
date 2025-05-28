import {
  Flex,
  Text,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  VStack,
  Input,
  Button,
  Textarea,
  Divider,
  Box,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

import ProfileCardSettings from "./ProfileCardSettings";
import "../../styles/userProfile.css";

export default function ProfileHeader({
  profile,
  isEditing,
  isPrivate,
  showTopArtists,
  showTopSongs,
  showLikedSongs,
  onEdit,
  onSave,
  onCancel,
  onProfileChange,
  onTogglePrivate,
  onToggleShowTopArtists,
  onToggleShowTopSongs,
  onToggleShowLikedSongs,
}) {
  return (
    <>
      {/* Profile Card */}
      <Card className="profile-card">
        <CardHeader className="profile-card-header">
          <Flex className="profile-card-header-flex">
            <HStack className="profile-card-avatar-stack">
              <Avatar
                size="xl"
                src="/placeholder.svg?height=96&width=96"
                className="profile-card-avatar"
                name={profile.name.slice(0, 2)}
              />
              <VStack align="flex-start" spacing={2}>
                {isEditing ? (
                  <VStack spacing={2} align="stretch">
                    <Input
                      value={profile.name}
                      onChange={(e) => onProfileChange("name", e.target.value)}
                      fontSize="xl"
                      fontWeight="bold"
                      bg="whiteAlpha.100"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                    />
                    <Input
                      value={profile.username}
                      onChange={(e) => onProfileChange("username", e.target.value)}
                      fontSize="sm"
                      bg="whiteAlpha.100"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      color="whiteAlpha.800"
                    />
                  </VStack>
                ) : (
                  <>
                    <Text fontSize="2xl" fontWeight="bold" color="white">
                      {profile.name}
                    </Text>
                    <Text color="whiteAlpha.800">{profile.username}</Text>
                  </>
                )}
                <HStack spacing={4} fontSize="sm" color="whiteAlpha.600">
                  <Text>📍 {profile.location}</Text>
                  <Text>📅 Joined {profile.joinDate}</Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack>
              {isEditing ? (
                <>
                  <Button
                    onClick={onSave}
                    size="sm"
                    bg="spotify.primary"
                    _hover={{ opacity: 0.9 }}
                    leftIcon={<CheckIcon />}
                    color="white"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={onCancel}
                    variant="outline"
                    size="sm"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _hover={{ bg: "whiteAlpha.100" }}
                    leftIcon={<CloseIcon />}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onEdit}
                  variant="outline"
                  size="sm"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ bg: "whiteAlpha.100" }}
                  leftIcon={<EditIcon />}
                >
                  Edit Profile
                </Button>
              )}
            </HStack>
          </Flex>
        </CardHeader>

        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Bio */}
            <Box>
              <Text color="whiteAlpha.800" fontSize="sm" fontWeight="medium" mb={2}>
                Bio
              </Text>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => onProfileChange("bio", e.target.value)}
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  resize="none"
                  rows={3}
                />
              ) : (
                <Text color="whiteAlpha.900">{profile.bio}</Text>
              )}
            </Box>

            <Divider borderColor="whiteAlpha.100" />

            {/* Privacy & Display Settings */}
            <ProfileCardSettings
              isPrivate={isPrivate}
              showTopArtists={showTopArtists}
              showTopSongs={showTopSongs}
              showLikedSongs={showLikedSongs}
              onTogglePrivate={onTogglePrivate}
              onToggleShowTopArtists={onToggleShowTopArtists}
              onToggleShowTopSongs={onToggleShowTopSongs}
              onToggleShowLikedSongs={onToggleShowLikedSongs}
            />
          </VStack>
        </CardBody>
      </Card>
    </>
  );
}
