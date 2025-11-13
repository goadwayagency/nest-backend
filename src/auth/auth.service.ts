import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import type { IUsersRepository } from '../users/interfaces/users-repository.interface';
import { JwtService } from './jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import type { IReferralValidator } from './interfaces/referral-validator.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly jwtService: JwtService, 
    @Inject('IReferralValidator')
    private readonly referralValidator: IReferralValidator
  ) {}

  async signup(email: string, password: string, referralCode: string) {
    const isValidReferral = await this.referralValidator.validate(referralCode);
    if (!isValidReferral) throw new BadRequestException('Invalid referral code');

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersRepository.create({ email, password: hashedPassword });
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
}
