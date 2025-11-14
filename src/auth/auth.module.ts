import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtService } from './jwt/jwt.service';
import { UsersModule } from '../users/users.module';
import { ReferralService } from './services/referral.service';
import { AuthController } from './controllers/auth.controller';
import { PasswordService } from './services/password.service';
import { EmailUniquePolicy } from './policies/email.policy';
import { ReferralPolicy } from './policies/referral.policy';
import { SignupInterceptor } from 'src/common/interceptors/signup.interceptor';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from 'src/events/event.module';
import { EventPublisherService } from 'src/events/publisher/event-publisher.service';

@Module({
  imports: [UsersModule, EventsModule, EventEmitterModule.forRoot(),],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    PasswordService,
    ReferralService,
    { provide: 'IReferralValidator', useExisting: ReferralService },
    { provide: 'EmailUniquePolicy', useClass: EmailUniquePolicy },
    { provide: 'ReferralPolicy', useClass: ReferralPolicy },
    SignupInterceptor,
    EventPublisherService,
  ],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
