export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicture: string;
  description?: string;
  roles: string[];
}