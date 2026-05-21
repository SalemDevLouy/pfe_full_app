import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AssessmentStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';

@Injectable()
export class AssessmentsService {
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

  async create(accessToken: string, dto: CreateAssessmentDto) {
    const userId = this.resolveUserId(accessToken);

    return this.prisma.assessment.create({
      data: {
        userId,
        type: dto.type,
        notes: dto.notes,
      },
    });
  }

  async submit(accessToken: string, assessmentId: string, dto: SubmitAssessmentDto) {
    const userId = this.resolveUserId(accessToken);
    const assessment = await this.prisma.assessment.findFirst({
      where: { id: assessmentId, userId },
    });

    if (!assessment) {
      throw new NotFoundException('Assessment not found');
    }

    if (assessment.status === AssessmentStatus.SUBMITTED) {
      throw new BadRequestException('Assessment already submitted');
    }

    const scores = (dto.answers ?? [])
      .map((answer) => answer.score)
      .filter((value): value is number => typeof value === 'number');

    const averageScore =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : null;

    await this.prisma.assessmentAnswer.deleteMany({ where: { assessmentId } });

    if (dto.answers?.length) {
      await this.prisma.assessmentAnswer.createMany({
        data: dto.answers.map((answer) => ({
          assessmentId,
          questionKey: answer.questionKey,
          questionLabel: answer.questionLabel,
          answer: answer.answer as never,
          score: answer.score,
        })),
      });
    }

    await this.prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        status: AssessmentStatus.SUBMITTED,
        score: averageScore,
        notes: dto.notes ?? assessment.notes,
        submittedAt: new Date(),
      },
    });

    return this.getById(accessToken, assessmentId);
  }

  async history(accessToken: string) {
    const userId = this.resolveUserId(accessToken);
    return this.prisma.assessment.findMany({
      where: { userId },
      include: {
        _count: {
          select: { answers: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(accessToken: string, assessmentId: string) {
    const userId = this.resolveUserId(accessToken);
    const assessment = await this.prisma.assessment.findFirst({
      where: { id: assessmentId, userId },
      include: {
        answers: true,
      },
    });

    if (!assessment) {
      throw new NotFoundException('Assessment not found');
    }

    return assessment;
  }
}
