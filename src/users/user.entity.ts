// I set the fields null for now just to move forward to the events
export class User {
  id: string;
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