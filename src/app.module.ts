import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SellerModule } from './sellers/seller.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule, 
    SellerModule,
    ChatModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
