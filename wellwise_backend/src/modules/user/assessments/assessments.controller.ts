import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';
import { AssessmentsService } from './assessments.service';

@Controller('user/assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  async create(
    @CurrentUser() authUser: AuthUser,
    @Body() dto: CreateAssessmentDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.assessmentsService.create(authUser.userId, dto);
  }

  @Post(':assessmentId/submit')
  async submit(
    @CurrentUser() authUser: AuthUser,
    @Param('assessmentId') assessmentId: string,
    @Body() dto: SubmitAssessmentDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.assessmentsService.submit(authUser.userId, assessmentId, dto);
  }

  @Get()
  async history(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.assessmentsService.history(authUser.userId);
  }

  @Get(':assessmentId')
  async getById(
    @CurrentUser() authUser: AuthUser,
    @Param('assessmentId') assessmentId: string,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.assessmentsService.getById(authUser.userId, assessmentId);
  }
}
