import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';
import { CreateHealthGoalDto } from './dto/create-health-goal.dto';
import { UpdateHealthGoalDto } from './dto/update-health-goal.dto';
import { UpdateHealthProfileDto } from './dto/update-health-profile.dto';
import { UpsertHealthPreferencesDto } from './dto/upsert-health-preferences.dto';

@Injectable()
export class HealthService {
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
    return this.prisma.healthProfile.findUnique({ where: { userId } });
  }

  async upsertProfile(accessToken: string, dto: UpdateHealthProfileDto) {
    const userId = this.resolveUserId(accessToken);
    const dateOfBirth = dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined;

    if (dto.dateOfBirth && Number.isNaN(dateOfBirth?.getTime())) {
      throw new BadRequestException('dateOfBirth must be a valid date string');
    }

    return this.prisma.healthProfile.upsert({
      where: { userId },
      create: {
        userId,
        dateOfBirth,
        gender: dto.gender,
        weightKg: dto.weightKg,
        heightCm: dto.heightCm,
        lifestyle: dto.lifestyle,
        sleepQuality: dto.sleepQuality,
        stressLevel: dto.stressLevel,
        focusLevel: dto.focusLevel,
        physicalActivity: dto.physicalActivity,
        nutritionHabits: dto.nutritionHabits,
        waterIntake: dto.waterIntake,
        notes: dto.notes,
      },
      update: {
        dateOfBirth,
        gender: dto.gender,
        weightKg: dto.weightKg,
        heightCm: dto.heightCm,
        lifestyle: dto.lifestyle,
        sleepQuality: dto.sleepQuality,
        stressLevel: dto.stressLevel,
        focusLevel: dto.focusLevel,
        physicalActivity: dto.physicalActivity,
        nutritionHabits: dto.nutritionHabits,
        waterIntake: dto.waterIntake,
        notes: dto.notes,
      },
    });
  }

  async listGoals(accessToken: string) {
    const userId = this.resolveUserId(accessToken);
    return this.prisma.healthGoal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createGoal(accessToken: string, dto: CreateHealthGoalDto) {
    const userId = this.resolveUserId(accessToken);
    if (!dto.title?.trim()) {
      throw new BadRequestException('title is required');
    }

    return this.prisma.healthGoal.create({
      data: {
        userId,
        title: dto.title.trim(),
        targetValue: dto.targetValue,
        unit: dto.unit,
      },
    });
  }

  async updateGoal(accessToken: string, goalId: string, dto: UpdateHealthGoalDto) {
    const userId = this.resolveUserId(accessToken);
    const goal = await this.prisma.healthGoal.findFirst({
      where: { id: goalId, userId },
    });

    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    return this.prisma.healthGoal.update({
      where: { id: goalId },
      data: {
        title: dto.title,
        targetValue: dto.targetValue,
        unit: dto.unit,
        status: dto.status,
      },
    });
  }

  async listPreferences(accessToken: string) {
    const userId = this.resolveUserId(accessToken);
    return this.prisma.healthPreference.findMany({
      where: { userId },
      orderBy: { key: 'asc' },
    });
  }

  async upsertPreferences(accessToken: string, dto: UpsertHealthPreferencesDto) {
    const userId = this.resolveUserId(accessToken);
    const preferences = dto.preferences ?? [];

    await this.prisma.$transaction(
      preferences.map((item) =>
        this.prisma.healthPreference.upsert({
          where: {
            userId_key: {
              userId,
              key: item.key,
            },
          },
          create: {
            userId,
            key: item.key,
            value: item.value,
          },
          update: {
            value: item.value,
          },
        }),
      ),
    );

    return this.listPreferences(accessToken);
  }
}
