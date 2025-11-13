import { Injectable, BadRequestException } from '@nestjs/common';
import { IPolicy } from './ipolicy.interface';
import * as usersRepositoryInterface from 'src/users/interfaces/users-repository.interface';


@Injectable()
export class AccountExistsPolicy implements IPolicy<string> {
  constructor(private readonly userRepository: usersRepositoryInterface.IUsersRepository) {}

  async validate(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');
  }
}
