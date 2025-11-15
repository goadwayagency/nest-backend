import { Injectable, BadRequestException } from '@nestjs/common';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly repo: ChatRepository) {}

  async saveMessage(data: { productId: string; fromUserId: string; toUserId?: string; message: string }) {
    return this.repo.createMessage(data);
  }

  async placeBid({ productId, buyerId, amount }: { productId: string; buyerId: string; amount: number }) {
    const existingBids = await this.repo.countBids(productId);
    console.log("00000-> Biding")
    if (existingBids >= 3) throw new BadRequestException('Max 3 bids reached for this product');

    return this.repo.createBid({ productId, buyerId, amount });
  }

  async respondToBid({ bidId, action }: { bidId: string; action: 'ACCEPT' | 'REJECT' }) {
    const bid = await this.repo.updateBidStatus(bidId, action === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED');

    if (action === 'ACCEPT') {
      await this.repo.updateProductStatus(bid.productId, 'RESERVED');

      // Schedule release after 1 hour
      setTimeout(async () => {
        const product = await this.repo.findProductById(bid.productId);
        if (product?.status === 'RESERVED') {
          await this.repo.updateProductStatus(product.id, 'AVAILABLE');
        }
      }, 60 * 60 * 1000);
    }

    return bid;
  }

  async counterBid({ bidId, newAmount }: { bidId: string; newAmount: number }) {
    // Update bid with new counter offer
    const bid = await this.repo.updateBidStatus(bidId, 'PENDING'); // reset to pending
    const counterBid = await this.repo.createBid({
      productId: bid.productId,
      buyerId: bid.buyerId,
      amount: newAmount,
    });
    return counterBid;
  }
  
  async acceptBid(bidId: string) {
    return this.respondToBid({ bidId, action: 'ACCEPT' });
  }
  
  async declineBid(bidId: string) {
    return this.respondToBid({ bidId, action: 'REJECT' });
  }
}
