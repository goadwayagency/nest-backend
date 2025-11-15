// src/sellers/seller.service.ts
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventPublisherService } from '../../../src/events/publisher/event-publisher.service';
import { UserRole, UserStatus } from '@prisma/client';
import * as usersRepositoryInterface from '../../../src/users/interfaces/users-repository.interface';
import { UpdateSellerDto } from '../dto/update-seller.dto';
import { CreateSellerDto } from '../dto/create-seller.dto';

@Injectable()
export class SellerService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: usersRepositoryInterface.IUsersRepository,  
    private readonly eventPublisher: EventPublisherService,
  ) {}

  async validateSellerAccount(sellerId: string, adminId: string) {
    const user = await this.usersRepository.findById(sellerId);
    if (!user) {
      throw new NotFoundException(`Seller with ID ${sellerId} not found`);
    }

    const updatedUser = await this.usersRepository.updateStatusAndRole(
        sellerId,
        UserStatus.ACTIVE,
        UserRole.SELLER
      );

    // publish
    await this.eventPublisher.publishSellerValidation(updatedUser, adminId);

    return updatedUser;
  }

  async create(createSellerDto: CreateSellerDto) {
    // Check if seller already exists for this user
    const exist
  }

  async findOne(id: string) {
    const seller = await this.sellerRepository.findOne(id);
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return seller;
  }

  async findByUserId(userId: string) {
    const seller = await this.sellerRepository.findByUserId(userId);
    if (!seller) {
      throw new NotFoundException(`Seller for user ID ${userId} not found`);
    }
    return seller;
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    try {
      return await this.sellerRepository.update(id, updateSellerDto);
    } catch (error) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.sellerRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
  }
}
