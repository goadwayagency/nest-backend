import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { User } from './user.entity';

@Injectable()
export class UsersRepository implements IUsersRepository, OnModuleInit {
  private prisma = new PrismaClient();

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async create(user: Partial<User>): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email!,
        password: user.password!,
        role: user.role || 'buyer',
        status: user.status || 'active',
        points: user.points || 0,
        referralCode: user.referralCode || null,
        referredBy: user.referredBy || null,
        authToken: user.authToken || null,
      },
    });
    return createdUser as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user as User | null;
  }
}
