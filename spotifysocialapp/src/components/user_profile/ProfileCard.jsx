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
  avatarUrl,
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
                src={avatarUrl || profile.avatarUrl || "/placeholder.svg?height=96&width=96"}
                name={profile.name.slice(0, 2)}
                className="profile-card-avatar"
              />
              <VStack className="profile-card-text-stack">
                {isEditing ? (
                  <VStack className="profile-card-text-stack">
                    <Input
                      value={profile.name}
                      onChange={(e) => onProfileChange("name", e.target.value)}
                      className="profile-card-input_name"
                    />
                    <Input
                      value={profile.username}
                      onChange={(e) => onProfileChange("username", e.target.value)}
                      className="profile-card-input_username"
                    />
                  </VStack>
                ) : (
                  <>
                    <Text className="profile-card-name">{profile.name}</Text>
                    <Text className="profile-card-username">{profile.username}</Text>
                  </>
                )}
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
