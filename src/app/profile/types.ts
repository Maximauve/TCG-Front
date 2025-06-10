import { DefaultSession } from "next-auth";

export interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  description: string;
  email: string;
  password: string;
  profilePicture: string;
  profilePictureFile?: File;
}

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      description?: string;
      email?: string;
      role?: string;
      profilePicture?: string;
    } & DefaultSession["user"]
  }
}

export interface ProfileHeaderProps {
  isEditing: boolean;
  onEditToggle: () => void;
  canEdit: boolean;
}

export interface ProfilePictureProps {
  profilePicture: string;
  isEditing: boolean;
  onPictureChange: (file: File) => void;
}

export interface ProfileFormProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  isEditing: boolean;
} 