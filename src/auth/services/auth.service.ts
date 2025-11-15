import { Injectable, BadRequestException, Inject, UseInterceptors } from '@nestjs/common';
import  * as usersRepositoryInterface from '../../users/interfaces/users-repository.interface';
import { JwtService } from '../jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import  * as referralValidatorInterface from '../interfaces/referral-validator.interface';
import { SignupDto } from '../dto/signup.dto';
import { PasswordService } from './password.service';
import * as ipolicyInterface from '../policies/ipolicy.interface';
import { User } from '../../users/user.entity';
import { EventPublisherService } from 'src/events/publisher/event-publisher.service';
import * as eventInterface from 'src/events/interfaces/event.interface';

@Injectable()
export class AuthService {
    constructor(
      @Inject('IUsersRepository')
      private readonly usersRepository: usersRepositoryInterface.IUsersRepository,
  
      private readonly jwtService: JwtService,
  
      @Inject('IReferralValidator')
      private readonly referralValidator: referralValidatorInterface.IReferralValidator,
  
      @Inject('IEventBus')
      private readonly eventBus: eventInterface.IEventBus,
  
      private readonly passwordService: PasswordService,
      private readonly eventPublisher: EventPublisherService,
      @Inject('EmailUniquePolicy')
      private readonly emailPolicy: ipolicyInterface.IPolicy<string>,
      @Inject('ReferralPolicy')
      private readonly referralPolicy: ipolicyInterface.IPolicy<string | undefined>,
    ) {}
  
  async signup(dto: SignupDto): Promise<User> {
    // Apply policies
    await this.emailPolicy.validate(dto.email);
    await this.referralPolicy.validate(dto.referralCode);

    const hashedPassword = await this.passwordService.hash(dto.password);

    const user = await this.usersRepository.create({
      email: dto.email,
      password: hashedPassword,
      referralCode: dto.referralCode,
    });

    // Event 1: Buyer Event => Referral Sign-Up
    await this.eventPublisher.publishSignup(user, dto.referralCode);

    return user;
  }
  
  async login(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
  
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  
    await this.usersRepository.saveAuthToken(user.id, accessToken);
  
    return {
      ...user,
      authToken: accessToken,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
