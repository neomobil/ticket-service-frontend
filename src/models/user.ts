import { UserInfo } from 'firebase/auth';

export interface User extends UserInfo {
  firstName?: string | null;
  lastName?: string | null;
  loggedIn?: boolean;
  role?: string | null;
}
