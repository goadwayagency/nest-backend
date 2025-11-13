import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '../../src/auth/jwt/jwt.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
    saveAuthToken: jest.fn(),
  };

  const mockReferralValidator = {
    validate: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'IUsersRepository', useValue: mockUsersRepository },
        { provide: 'IReferralValidator', useValue: mockReferralValidator },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user with hashed password', async () => {
    mockReferralValidator.validate.mockResolvedValue(true);
    mockUsersRepository.create.mockResolvedValue({ id: 1, email: 'test@test.com' });

    const result = await service.signup('test@test.com', '123456', 'ABC123');

    expect(mockReferralValidator.validate).toHaveBeenCalledWith('ABC123');
    expect(mockUsersRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@test.com',
        password: expect.any(String), // hashed password
      }),
    );
    expect(result).toEqual({ id: 1, email: 'test@test.com' });
  });

  it('should throw if referral code is invalid', async () => {
    mockReferralValidator.validate.mockResolvedValue(false);

    await expect(
      service.signup('test@test.com', '123456', 'WRONG')
    ).rejects.toThrow(BadRequestException);
  });

  it('should login and return user with authToken', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = { id: 1, email: 'test@test.com', password: hashedPassword };
    mockUsersRepository.findByEmail.mockResolvedValue(user);
    mockJwtService.sign.mockReturnValue('jwt-token');
    mockUsersRepository.saveAuthToken.mockResolvedValue({
      ...user,
      authToken: 'jwt-token',
    });

    const result = await service.login('test@test.com', '123456');

    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith('test@test.com');
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: user.id,
      email: user.email,
    });
    expect(mockUsersRepository.saveAuthToken).toHaveBeenCalledWith(user.id, 'jwt-token');

    expect(result).toEqual({
      ...user,
      authToken: 'jwt-token',
    });
  });

  it('should throw on invalid login credentials', async () => {
    mockUsersRepository.findByEmail.mockResolvedValue(null);

    await expect(service.login('test@test.com', '123456')).rejects.toThrow(BadRequestException);
  });

  it('should throw if password does not match on login', async () => {
    const hashedPassword = await bcrypt.hash('wrongpass', 10);
    mockUsersRepository.findByEmail.mockResolvedValue({ id: 1, email: 'test@test.com', password: hashedPassword });

    await expect(service.login('test@test.com', '123456')).rejects.toThrow(BadRequestException);
  });
});
