// src/sellers/seller.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventPublisherService } from '../../../src/events/publisher/event-publisher.service';
import { UserRole, UserStatus } from '@prisma/client';
import * as usersRepositoryInterface from '../../../src/users/interfaces/users-repository.interface';

@Injectable()
export class SellerService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: usersRepositoryInterface.IUsersRepository,  
    private readonly eventPublisher: EventPublisherService,
  ) {}

  async validateSellerAccount(sellerId: string, adminId: string) {
    // 1️⃣ Find the user
    const user = await this.usersRepository.findById(sellerId);
    if (!user) {
      throw new NotFoundException(`Seller with ID ${sellerId} not found`);
    }

    // update
    const updatedUser = await this.usersRepository.updateStatusAndRole(
        sellerId,
        UserStatus.ACTIVE,
        UserRole.SELLER
      );

    // publish
    await this.eventPublisher.publishSellerValidation(updatedUser, adminId);

    return updatedUser;
  }
}
