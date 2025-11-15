import { Module } from '@nestjs/common';
import { SellerService } from './services/seller.service';
import { UsersModule } from '../users/users.module';
import { EventsModule } from 'src/events/event.module';
import { SellerController } from './contollers/seller.controller';
import { UsersRepository } from 'src/users/users.repository';
import { EventPublisherService } from 'src/events/publisher/event-publisher.service';

@Module({
  imports: [UsersModule, EventsModule],
  controllers: [SellerController],
  providers: [
    { provide: 'IUsersRepository', useClass: UsersRepository },
    SellerService,
    EventPublisherService,
  ],
})
export class SellerModule {}
