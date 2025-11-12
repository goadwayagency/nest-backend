import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt/jwt.service';
import { UsersModule } from '../users/users.module';
import { ReferralService } from './referral/referral.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    {
      provide: 'IReferralValidator',
      useClass: ReferralService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
