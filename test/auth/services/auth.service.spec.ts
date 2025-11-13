import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisherService } from '../../../src/events/services/event-publisher.service';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from '../../../src/auth/services/auth.service';
import { PasswordService } from '../../../src/auth/services/password.service';
import { JwtService } from '../../../src/auth/jwt/jwt.service';
import { SignupDto } from '../../../src/auth/dto/signup.dto';

// Create mocks for all dependencies
const mockUsersRepository = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  saveAuthToken: jest.fn(),
};

const mockReferralValidator = {
  validateReferralCode: jest.fn(),
};

const mockEventBus = {
  emit: jest.fn(),
};

const mockPasswordService = {
  hash: jest.fn(),
  compare: jest.fn(),
};

const mockEventPublisher = {
  publishSignup: jest.fn(),
};

const mockEmailPolicy = {
  validate: jest.fn(),
};

const mockReferralPolicy = {
  validate: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'IUsersRepository', useValue: mockUsersRepository },
        { provide: 'IReferralValidator', useValue: mockReferralValidator },
        { provide: 'IEventBus', useValue: mockEventBus },
        { provide: PasswordService, useValue: mockPasswordService },
        { provide: EventPublisherService, useValue: mockEventPublisher },
        { provide: 'EmailUniquePolicy', useValue: mockEmailPolicy },
        { provide: 'ReferralPolicy', useValue: mockReferralPolicy },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a user and publish an event', async () => {
      const dto: SignupDto = {
        email: 'test@example.com',
        password: 'password123',
        referralCode: 'ABC123',
      };

      const hashedPassword = 'hashed123';
      const createdUser = {
        id: '1',
        email: dto.email,
        password: hashedPassword,
        referralCode: dto.referralCode,
      };

      mockEmailPolicy.validate.mockResolvedValueOnce(undefined);
      mockReferralPolicy.validate.mockResolvedValueOnce(undefined);
      mockPasswordService.hash.mockResolvedValueOnce(hashedPassword);
      mockUsersRepository.create.mockResolvedValueOnce(createdUser);

      const result = await service.signup(dto);

      expect(mockEmailPolicy.validate).toHaveBeenCalledWith(dto.email);
      expect(mockReferralPolicy.validate).toHaveBeenCalledWith(dto.referralCode);
      expect(mockPasswordService.hash).toHaveBeenCalledWith(dto.password);
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        email: dto.email,
        password: hashedPassword,
        referralCode: dto.referralCode,
      });
      expect(mockEventPublisher.publishSignup).toHaveBeenCalledWith(createdUser, dto.referralCode);
      expect(result).toEqual(createdUser);
    });
  });

  describe('login', () => {
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      password: 'hashedPassword',
    };

    it('should throw BadRequestException if user not found', async () => {
      mockUsersRepository.findByEmail.mockResolvedValueOnce(null);
      await expect(service.login('notfound@example.com', 'password')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if password does not match', async () => {
      mockUsersRepository.findByEmail.mockResolvedValueOnce(mockUser);
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValueOnce(false);

      await expect(service.login(mockUser.email, 'wrongpassword')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return user with auth token on success', async () => {
      mockUsersRepository.findByEmail.mockResolvedValueOnce(mockUser);
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValueOnce(true);
      mockJwtService.sign.mockReturnValueOnce('mockToken');
      mockUsersRepository.saveAuthToken.mockResolvedValueOnce(undefined);

      const result = await service.login(mockUser.email, 'password');

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
      expect(mockUsersRepository.saveAuthToken).toHaveBeenCalledWith(mockUser.id, 'mockToken');
      expect(result).toEqual({
        ...mockUser,
        authToken: 'mockToken',
      });
    });
  });
});
