import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { AdminReportsService } from './admin-reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('admin/reports')
export class AdminReportsController {
  constructor(private readonly reportsService: AdminReportsService) {}

  @Get()
  async list(
    @CurrentUser() authUser: AuthUser,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('type') type?: string,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.reportsService.list({
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
      type,
    });
  }

  @Get(':id')
  async getById(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.reportsService.getById(id);
  }

  @Post()
  async generate(
    @CurrentUser() authUser: AuthUser,
    @Body() dto: CreateReportDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.reportsService.generate(authUser.userId, dto);
  }

  @Get('type/:type')
  async getByType(
    @CurrentUser() authUser: AuthUser,
    @Param('type') type: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.reportsService.getByType(
      type,
      skip ? parseInt(String(skip), 10) : 0,
      take ? parseInt(String(take), 10) : 20,
    );
  }
}
