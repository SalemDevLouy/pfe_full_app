import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import { CreateHealthGoalDto } from './dto/create-health-goal.dto';
import { UpdateHealthGoalDto } from './dto/update-health-goal.dto';
import { UpdateHealthProfileDto } from './dto/update-health-profile.dto';
import { UpsertHealthPreferencesDto } from './dto/upsert-health-preferences.dto';
import { HealthService } from './health.service';

@Controller('user/health-profile')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getProfile(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.healthService.getProfile(authUser.userId);
  }

  @Put()
  async upsertProfile(
    @CurrentUser() authUser: AuthUser,
    @Body() dto: UpdateHealthProfileDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.healthService.upsertProfile(authUser.userId, dto);
  }

  @Get('goals')
  async listGoals(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.healthService.listGoals(authUser.userId);
  }

  @Post('goals')
  async createGoal(
    @CurrentUser() authUser: AuthUser,
    @Body() dto: CreateHealthGoalDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.healthService.createGoal(authUser.userId, dto);
  }

  @Patch('goals/:goalId')
  async updateGoal(
    @CurrentUser() authUser: AuthUser,
    @Param('goalId') goalId: string,
    @Body() dto: UpdateHealthGoalDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.healthService.updateGoal(authUser.userId, goalId, dto);
  }

  @Get('preferences')
  async listPreferences(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.healthService.listPreferences(authUser.userId);
  }

  @Put('preferences')
  async upsertPreferences(
    @CurrentUser() authUser: AuthUser,
    @Body() dto: UpsertHealthPreferencesDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.healthService.upsertPreferences(authUser.userId, dto);
  }
}
