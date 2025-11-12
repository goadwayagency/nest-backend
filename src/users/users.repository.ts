import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { User } from './user.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(user: Partial<User>): Promise<User> {
    const newUser = { id: Date.now(), ...user } as User;
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }
}
