import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash } from 'crypto';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  private resolveUserId(accessToken: string): string {
    const userId = this.authService.getSessionUserId(accessToken);
    if (!userId) {
      throw new UnauthorizedException('Invalid or expired session');
    }
    return userId;
  }

  async getProfile(accessToken: string) {
    const userId = this.resolveUserId(accessToken);

    const [user, orderCount, reviewCount, wishlistCount] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
          gender: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.order.count({ where: { userId } }),
      this.prisma.review.count({ where: { userId } }),
      this.prisma.wishlistItem.count({ where: { userId } }),
    ]);

    if (!user) throw new UnauthorizedException('User not found');

    return { ...user, orderCount, reviewCount, wishlistCount };
  }

  async updateProfile(accessToken: string, updateProfileDto: UpdateProfileDto) {
    const userId = this.resolveUserId(accessToken);
    
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: updateProfileDto.name ?? undefined,
        age: updateProfileDto.age ?? undefined,
        gender: updateProfileDto.gender ?? undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        gender: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async changePassword(
    accessToken: string,
    changePasswordDto: ChangePasswordDto,
  ) {
    const userId = this.resolveUserId(accessToken);
    
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const [salt, hash] = user.passwordHash.split(':');
    if (!salt || !hash) {
      throw new BadRequestException('Invalid user state');
    }

    const currentHashInput = `${salt}:${changePasswordDto.currentPassword}`;
    const currentHash = createHash('sha256').update(currentHashInput).digest('hex');

    if (currentHash !== hash) {
      throw new BadRequestException('Current password is incorrect');
    }

    if (changePasswordDto.newPassword.length < 6) {
      throw new BadRequestException('New password must be at least 6 characters');
    }

    const newPasswordHash = createHash('sha256')
      .update(`${salt}:${changePasswordDto.newPassword}`)
      .digest('hex');

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: `${salt}:${newPasswordHash}`,
      },
    });

    return { message: 'Password changed successfully' };
  }

  async deleteAccount(accessToken: string) {
    const userId = this.resolveUserId(accessToken);
    
    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'Account deleted successfully' };
  }
}

