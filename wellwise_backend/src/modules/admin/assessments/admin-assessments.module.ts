import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AdminAssessmentsController } from './admin-assessments.controller';
import { AdminAssessmentsService } from './admin-assessments.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminAssessmentsController],
  providers: [AdminAssessmentsService],
  exports: [AdminAssessmentsService],
})
export class AdminAssessmentsModule {}
