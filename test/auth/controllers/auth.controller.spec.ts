import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from '../../../src/auth/services/auth.service';
import { AuthController } from '../../../src/auth/controllers/auth.controller';
import { SignupDto } from '../../../src/auth/dto/signup.dto';
import { LoginDto } from '../../../src/auth/dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => jest.clearAllMocks());

  it('signup should call AuthService.signup with DTO', async () => {
    const dto: SignupDto = { email: 'test@test.com', password: '123456', referralCode: 'ABC123' };
    const mockUser = { id: 1, email: 'test@test.com' };

    mockAuthService.signup.mockResolvedValue(mockUser);

    const result = await controller.signup(dto);

    expect(mockAuthService.signup).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockUser);
  });

  it('signin should call AuthService.login with email and password', async () => {
    const dto: LoginDto = { email: 'test@test.com', password: '123456' };
    const mockResult = { authToken: 'jwt-token', email: dto.email };

    mockAuthService.login.mockResolvedValue(mockResult);

    const result = await controller.signin(dto);

    expect(mockAuthService.login).toHaveBeenCalledWith(dto.email, dto.password);
    expect(result).toEqual(mockResult);
  });

  it('signup should throw if AuthService.signup throws', async () => {
    const dto: SignupDto = { email: 'x', password: 'y', referralCode: 'Z' };
    mockAuthService.signup.mockRejectedValue(new BadRequestException('Invalid referral'));

    await expect(controller.signup(dto)).rejects.toThrow(BadRequestException);
  });

  it('signin should throw if AuthService.login throws', async () => {
    const dto: LoginDto = { email: 'x', password: 'y' };
    mockAuthService.login.mockRejectedValue(new BadRequestException('Invalid credentials'));

    await expect(controller.signin(dto)).rejects.toThrow(BadRequestException);
  });
});
