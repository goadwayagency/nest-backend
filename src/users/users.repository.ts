import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { User } from './user.entity';
import { prisma } from './../lib/prisma'
import { UserRole, UserStatus } from '@prisma/client';


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

  async findById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async saveAuthToken(userId: string, token: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { authToken: token },
    });
  }

  async updateStatusAndRole(
    userId: string,
    status: UserStatus,
    role: UserRole
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: { status, role },
    });
  }
}