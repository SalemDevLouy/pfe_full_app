import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AdminAssessmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(options: {
    skip?: number;
    take?: number;
    type?: string;
    status?: string;
  }) {
    const where: any = {};

    if (options.type) {
      where.type = options.type;
    }

    if (options.status) {
      where.status = options.status;
    }

    const [assessments, total] = await Promise.all([
      this.prisma.assessment.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          answers: true,
          _count: {
            select: {
              answers: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.assessment.count({ where }),
    ]);

    return {
      items: assessments,
      total,
      skip: options.skip || 0,
      take: options.take || 20,
    };
  }

  async getStats() {
    const [totalAssessments, submittedCount, draftCount, averageScore] = await Promise.all([
      this.prisma.assessment.count(),
      this.prisma.assessment.count({ where: { status: 'SUBMITTED' } }),
      this.prisma.assessment.count({ where: { status: 'DRAFT' } }),
      this.prisma.assessment.aggregate({
        _avg: {
          score: true,
        },
      }),
    ]);

    const typeBreakdown = await this.prisma.assessment.groupBy({
      by: ['type'],
      _count: true,
    });

    return {
      totalAssessments,
      submittedCount,
      draftCount,
      submissionRate: ((submittedCount / totalAssessments) * 100).toFixed(2),
      averageScore: averageScore._avg.score?.toFixed(2) || 0,
      typeBreakdown,
    };
  }
}
