import { UserRole, UserStatus } from "./enums/user.enum";

export class User {
  id: number;
  email: string;
  password?: string;
  referralCode?: string | null;
  referredBy?: string | null;
  authToken?: string | null;
  role: string;
  status: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}