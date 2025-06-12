import { DefaultSession } from "next-auth";

export interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  description: string;
  email: string;
  password: string;
  profilePicture: string;
}

export interface ProfileHeaderProps {
  isEditing: boolean;
  onEditToggle: () => void;
  canEdit: boolean;
}

export interface ProfilePictureProps {
  profilePicture: string;
  isEditing: boolean;
  onPictureChange: (url: string) => void;
}

export interface ProfileFormProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  isEditing: boolean;
} 