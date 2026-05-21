import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  const buildMockUser = (overrides: Partial<Record<string, unknown>> = {}) => ({
    id: 'user-1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    passwordHash: `${'fixed-salt'}:${createHash('sha256').update('fixed-salt:secret123').digest('hex')}`,
    age: 29,
    gender: 'female',
    role: 'USER',
    isEmailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  beforeEach(() => {
    prismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    } as unknown as PrismaService;

    authService = new AuthService(prismaService);
  });

  it('registers a user and returns a session', async () => {
    jest.mocked(prismaService.user.findUnique).mockResolvedValueOnce(null);
    jest.mocked(prismaService.user.create).mockResolvedValueOnce(buildMockUser() as never);

    const result = await authService.register({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
      age: 29,
      gender: 'female',
    });

    expect(result.accessToken).toBeDefined();
    expect(result.user).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 29,
      gender: 'female',
    });
  });

  it('rejects duplicate registration', async () => {
    jest.mocked(prismaService.user.findUnique).mockResolvedValueOnce({
      id: 'user-1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      passwordHash: 'salt:hash',
      age: 29,
      gender: 'female',
      role: 'USER',
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);

    await expect(
      authService.register({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('logs in a registered user', async () => {
    jest.mocked(prismaService.user.findUnique)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(buildMockUser() as never);
    jest.mocked(prismaService.user.create).mockResolvedValueOnce(buildMockUser() as never);

    await authService.register({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
    });

    const result = await authService.login({
      email: 'jane@example.com',
      password: 'secret123',
    });

    expect(result.accessToken).toBeDefined();
    expect(result.user.email).toBe('jane@example.com');
  });

  it('rejects invalid login credentials', async () => {
    jest.mocked(prismaService.user.findUnique).mockResolvedValueOnce(null);

    await expect(
      authService.login({
        email: 'jane@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('returns the current profile for a valid token', async () => {
    jest.mocked(prismaService.user.findUnique)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(buildMockUser() as never);
    jest.mocked(prismaService.user.create).mockResolvedValueOnce(buildMockUser() as never);

    const session = await authService.register({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
    });

    expect(await authService.profile(session.accessToken)).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });
  });
});