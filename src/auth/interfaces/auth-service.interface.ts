import { User } from '../../users/user.entity';

export interface IAuthService {
  signup(email: string, password: string): Promise<User>;
  signin(email: string, password: string): Promise<{ accessToken: string }>;
}
