// src/seller/repositories/seller.repository.ts
import { Injectable } from '@nestjs/common';
import { ISellerRepository } from './interfaces/seller-repository.interface';
import { CreateSellerDto } from './dto/create-seller.dto';
import { prisma } from './../lib/prisma';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellerRepository implements ISellerRepository {
  constructor() {}

  async create(createSellerDto: CreateSellerDto) {
    return prisma.seller.create({
      data: createSellerDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findAll() {
    return prisma.seller.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return prisma.seller.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.seller.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    return prisma.seller.update({
      where: { id },
      data: updateSellerDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.seller.delete({
      where: { id },
    });
  }

  async exists(userId: string): Promise<boolean> {
    const seller = await prisma.seller.findUnique({
      where: { userId },
      select: { id: true },
    });
    return !!seller;
  }
}