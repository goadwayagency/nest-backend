import { Controller, Post, Body, Param } from '@nestjs/common';
import { SellerService } from '../services/seller.service';
import { ValidateSellerDto } from '../dto/validate-seller.dto';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post(':id/validate')
  async validateSeller(
    @Param('id') sellerId: string,
    @Body() body: ValidateSellerDto,
  ) {
    const { adminId } = body;
    const updatedSeller = await this.sellerService.validateSellerAccount(sellerId, adminId);
    return {
      message: 'Seller account validated successfully',
      seller: updatedSeller,
    };
  }
}
