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

export function formatDateDMY(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = date.getDate();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}