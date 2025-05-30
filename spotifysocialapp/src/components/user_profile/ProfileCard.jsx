import { useRef } from "react";
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
  avatar_url,
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
  const fileInput = useRef();

  return (
    <>
      {/* Profile Card */}
      <Card className="profile-card">
        <CardHeader className="profile-card-header">
          <Flex className="profile-card-header-flex">
            <HStack className="profile-card-avatar-stack">
              <Box
                role="group"
                position="relative"
                w="96px"
                h="96px"
                borderRadius="full"
                overflow="hidden"
                cursor={isEditing ? "pointer" : "default"}
                onClick={() => isEditing && fileInput.current.click()}
              >
                <Avatar size="xl" src={avatar_url || profile.avatar_url} name={profile.name[0]} />

                {isEditing && (
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInput}
                      display="none"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          onProfileChange("avatar_url", reader.result);
                        };
                      }}
                    />

                    {/* overlay edit icon */}
                    <Box
                      position="absolute"
                      inset="0"
                      bg="blackAlpha.600"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.2s"
                    >
                      <EditIcon boxSize={6} />
                    </Box>
                  </>
                )}
              </Box>
              <VStack className="profile-card-text-stack">
                {isEditing ? (
                  <VStack className="profile-card-text-stack">
                    <Input
                      value={profile.name}
                      onChange={(e) => onProfileChange("display_name", e.target.value)}
                      className="profile-card-input_name"
                    />
                  </VStack>
                ) : (
                  <>
                    <Text className="profile-card-name">{profile.name}</Text>
                  </>
                )}
                <Text className="profile-card-username">@{profile.username}</Text>
                <HStack className="profile-card-meta">
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
                    className="profile-card_btn-save"
                    leftIcon={<CheckIcon />}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={onCancel}
                    className="profile-card_btn-cancel"
                    leftIcon={<CloseIcon />}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={onEdit} className="profile-card_btn-edit" leftIcon={<EditIcon />}>
                  Edit Profile
                </Button>
              )}
            </HStack>
          </Flex>
        </CardHeader>

        <CardBody>
          <VStack className="profile-card_body">
            {/* Bio */}
            <Box>
              <Text className="profile-card_bio-label">Bio</Text>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => onProfileChange("bio", e.target.value)}
                  rows={3}
                  className="profile-card_bio-textarea"
                />
              ) : (
                <Text className="profile-card_bio-text">{profile.bio}</Text>
              )}
            </Box>

            <Divider className="profile-card_divider" />

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
