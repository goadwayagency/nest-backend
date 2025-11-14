import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
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

}
