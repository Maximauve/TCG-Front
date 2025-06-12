import { ProfileData } from "@/src/app/profile/types";
import { User } from "@/src/types/model/User";

export const getInitialData = (userData: User): ProfileData => ({
  firstName: userData?.firstName || '',
  lastName: userData?.lastName || '',
  username: userData?.username || '',
  description: userData?.description || '',
  email: userData?.email || '',
  password: '',
  profilePicture: userData?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
});