import { Inject, Injectable } from '@nestjs/common';
import type { IUsersRepository } from './interfaces/users-repository.interface';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository
) {}

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  create(user: Partial<User>): Promise<User> {
    return this.usersRepository.create(user);
  }

  saveAuthToken(userId: number, token: string): Promise<User> {
    return this.usersRepository.saveAuthToken(userId, token);
  }
}
