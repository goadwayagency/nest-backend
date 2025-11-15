import { CreateSellerDto } from '../dto/create-seller.dto';
import { UpdateSellerDto } from '../dto/update-seller.dto';
import { ISeller, ISellerWithUser } from './seller.interface';

export interface ISellerRepository {
  create(createSellerDto: CreateSellerDto): Promise<ISellerWithUser>;
  findAll(): Promise<ISellerWithUser[]>;
  findOne(id: string): Promise<ISellerWithUser | null>;
  findByUserId(userId: string): Promise<ISellerWithUser | null>;
  update(id: string, updateSellerDto: UpdateSellerDto): Promise<ISellerWithUser>;
  delete(id: string): Promise<ISeller>;
  exists(userId: string): Promise<boolean>;
}