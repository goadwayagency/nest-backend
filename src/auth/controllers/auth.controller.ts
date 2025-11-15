import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../jwt/jwt.strategy';
// import { SignupInterceptor } from 'src/common/interceptors/signup.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // @UseInterceptors(SignupInterceptor)
    signup(@Body() dto: SignupDto) {
      return this.authService.signup(dto);
    }

  @Post('login')
  signin(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    // if (!req.user || !req.user.id) {
    //   throw new UnauthorizedException('Invalid token: user ID not found');
    // }
  
    const user = await this.authService.getCurrentUser(req.user.id);
  
    const { password, authToken, ...userWithoutSensitiveInfo } = user;
    return userWithoutSensitiveInfo;
  }

}
