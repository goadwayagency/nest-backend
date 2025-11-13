import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { AuthController } from '../../src/auth/auth.controller';

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

  it('signup should call AuthService.signup', async () => {
    mockAuthService.signup.mockResolvedValue({ id: 1, email: 'test@test.com' });

    const dto = { email: 'test@test.com', password: '123456', referralCode: 'ABC123' };
    const result = await controller.signup(dto);

    expect(mockAuthService.signup).toHaveBeenCalledWith(dto.email, dto.password, dto.referralCode);
    expect(result).toEqual({ id: 1, email: 'test@test.com' });
  });

  it('signin should call AuthService.signin', async () => {
    mockAuthService.login.mockResolvedValue({ accessToken: 'jwt-token' });

    const dto = { email: 'test@test.com', password: '123456' };
    const result = await controller.signin(dto);

    expect(mockAuthService.login).toHaveBeenCalledWith(dto.email, dto.password);
    expect(result).toEqual({ accessToken: 'jwt-token' });
  });

  it('signup should throw if AuthService.signup throws', async () => {
    mockAuthService.signup.mockRejectedValue(new BadRequestException('Invalid referral'));

    await expect(controller.signup({ email: 'x', password: 'y', referralCode: 'Z' })).rejects.toThrow(BadRequestException);
  });
});
