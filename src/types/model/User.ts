export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture: string;
  description?: string;
  roles: string[];
}