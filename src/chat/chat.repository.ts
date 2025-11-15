import { Injectable } from '@nestjs/common';
import { Bid, ChatMessage, Product } from '@prisma/client';
import { prisma } from '../../src/lib/prisma';

@Injectable()
export class ChatRepository {
  async createMessage(data: {
    productId: string;
    fromUserId: string;
    toUserId?: string;
    message: string;
  }): Promise<ChatMessage> {
    return prisma.chatMessage.create({ data: {
      productId: data.productId,
      fromUserId: data.fromUserId,
      message: data.message,
      toUserId: data.toUserId ?? null,
    }, });
  }

  async createBid(data: { productId: string; buyerId: string; amount: number }): Promise<Bid> {
    return prisma.bid.create({ data });
  }

  async countBids(productId: string): Promise<number> {
    return prisma.bid.count({ where: { productId } });
  }

  async updateBidStatus(bidId: string, status: 'PENDING' | 'ACCEPTED' | 'REJECTED'): Promise<Bid> {
    return prisma.bid.update({ where: { id: bidId }, data: { status } });
  }

  async updateProductStatus(productId: string, status: 'AVAILABLE' | 'RESERVED' | 'SOLD'): Promise<Product> {
    return prisma.product.update({ where: { id: productId }, data: { status } });
  }

  async findProductById(productId: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id: productId } });
  }
}
