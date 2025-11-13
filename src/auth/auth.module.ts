import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtService } from './jwt/jwt.service';
import { UsersModule } from '../users/users.module';
import { ReferralService } from './referral/referral.service';
import { EventModule } from 'src/events/event.module';
import { AuthController } from './controllers/auth.controller';
import { PasswordService } from './services/password.service';
import { EmailUniquePolicy } from './policies/email.policy';
import { ReferralPolicy } from './policies/referral.policy';

@Module({
  imports: [UsersModule, EventModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    PasswordService,

    ReferralService,
    { provide: 'IReferralValidator', useExisting: ReferralService },

    { provide: 'EmailUniquePolicy', useClass: EmailUniquePolicy },
    { provide: 'ReferralPolicy', useClass: ReferralPolicy },
  ],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
