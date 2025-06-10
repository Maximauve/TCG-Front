import { ProfileData } from "@/src/app/profile/types";

export const getInitialData = (userData: any): ProfileData => ({
  firstName: userData?.firstName || '',
  lastName: userData?.lastName || '',
  username: userData?.username || '',
  description: userData?.description || '',
  email: userData?.email || '',
  password: '',
  profilePicture: userData?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
});