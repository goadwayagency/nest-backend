import { UserRole, UserStatus } from '@prisma/client';
import { User } from '../user.entity';

export interface IUsersRepository {
  create(user: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  saveAuthToken(userId: string, token: string): Promise<User>;
  findById(userId: string): Promise<User | null>;
  updateStatusAndRole(userId: string, status: UserStatus, role: UserRole): Promise<User>;
}