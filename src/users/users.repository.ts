import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { User } from './user.entity';
import { prisma } from './../lib/prisma'


@Injectable()
export class UsersRepository implements IUsersRepository {
  async create(user: Partial<User>): Promise<User> {
    return prisma.user.create({
      data: user as any,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async saveAuthToken(userId: number, token: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { authToken: token },
    });
  }
}