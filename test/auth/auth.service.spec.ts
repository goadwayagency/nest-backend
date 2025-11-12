import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
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
        { provide: 'JwtService', useValue: mockJwtService },
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
    expect(mockUsersRepository.create).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, email: 'test@test.com' });
  });

  it('should throw if referral code is invalid', async () => {
    mockReferralValidator.validate.mockResolvedValue(false);

    await expect(
      service.signup('test@test.com', '123456', 'WRONG')
    ).rejects.toThrow(BadRequestException);
  });

  it('should signin and return access token', async () => {
    const hashed = await bcrypt.hash('123456', 10);
    mockUsersRepository.findByEmail.mockResolvedValue({ id: 1, email: 'test@test.com', password: hashed });
    mockJwtService.sign.mockReturnValue('jwt-token');

    const result = await service.signin('test@test.com', '123456');

    expect(result).toEqual({ accessToken: 'jwt-token' });
  });

  it('should throw on invalid signin credentials', async () => {
    mockUsersRepository.findByEmail.mockResolvedValue(null);

    await expect(service.signin('test@test.com', '123456')).rejects.toThrow(BadRequestException);
  });
});
