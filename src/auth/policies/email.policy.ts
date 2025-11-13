import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { IPolicy } from './ipolicy.interface';
import { IUsersRepository } from 'src/users/interfaces/users-repository.interface';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class EmailUniquePolicy implements IPolicy<string> {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async validate(email: string): Promise<void> {
    const exists = await this.usersRepository.findByEmail(email);
    if (exists) {
      throw new BadRequestException('Email already in use');
    }
  }
}
