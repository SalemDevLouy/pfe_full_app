import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { AdminAssessmentsService } from './admin-assessments.service';

@Controller('admin/assessments')
export class AdminAssessmentsController {
  constructor(private readonly assessmentsService: AdminAssessmentsService) {}

  @Get()
  async list(
    @CurrentUser() authUser: AuthUser,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.assessmentsService.list({
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
      type,
      status,
    });
  }

  @Get('stats')
  async getStats(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.assessmentsService.getStats();
  }
}
