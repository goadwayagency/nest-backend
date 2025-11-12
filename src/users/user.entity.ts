export class User {
  id: number;
  email: string;
  password: string;
  role: string;
  status: string;
  points: number;
  referralCode: string | null;
  referredBy: string | null;
  authToken: string | null;
}
  