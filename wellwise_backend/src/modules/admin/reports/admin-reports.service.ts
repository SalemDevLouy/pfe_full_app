import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class AdminReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(options: {
    skip?: number;
    take?: number;
    type?: string;
  }) {
    const where: any = {};

    if (options.type) {
      where.type = options.type;
    }

    const [reports, total] = await Promise.all([
      this.prisma.adminReport.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        include: {
          generatedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.adminReport.count({ where }),
    ]);

    return {
      items: reports,
      total,
      skip: options.skip || 0,
      take: options.take || 20,
    };
  }

  async getById(id: string) {
    const report = await this.prisma.adminReport.findUnique({
      where: { id },
      include: {
        generatedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  async generate(userId: string, dto: CreateReportDto) {
    const reportData = await this.generateReportData(dto.type, dto.filters);

    const report = await this.prisma.adminReport.create({
      data: {
        type: dto.type,
        title: dto.title || `${dto.type} Report`,
        parameters: dto.filters || {},
        generatedById: userId,
      },
      include: {
        generatedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      ...report,
      data: reportData,
    };
  }

  async getByType(
    type: string,
    skip: number = 0,
    take: number = 20,
  ) {
    const reportType = type.toUpperCase() as any;

    const [reports, total] = await Promise.all([
      this.prisma.adminReport.findMany({
        where: { type: reportType },
        skip,
        take,
        include: {
          generatedBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.adminReport.count({ where: { type: reportType } }),
    ]);

    return {
      items: reports,
      total,
      skip,
      take,
    };
  }

  private async generateReportData(type: string, filters: Record<string, any> = {}) {
    switch (type) {
      case 'SALES':
        return await this.generateSalesReport(filters);
      case 'USERS':
        return await this.generateUsersReport(filters);
      case 'PRODUCTS':
        return await this.generateProductsReport(filters);
      case 'HEALTH':
        return await this.generateHealthReport(filters);
      default:
        return {};
    }
  }

  private async generateSalesReport(filters: Record<string, any>) {
    const orders = await this.prisma.order.aggregate({
      _sum: { totalAmount: true },
      _count: true,
    });

    return {
      totalOrders: orders._count,
      totalRevenue: orders._sum.totalAmount || 0,
      generatedAt: new Date(),
    };
  }

  private async generateUsersReport(filters: Record<string, any>) {
    const userCount = await this.prisma.user.count();
    const verifiedCount = await this.prisma.user.count({
      where: { isEmailVerified: true },
    });

    return {
      totalUsers: userCount,
      verifiedUsers: verifiedCount,
      verificationRate: ((verifiedCount / userCount) * 100).toFixed(2),
      generatedAt: new Date(),
    };
  }

  private async generateProductsReport(filters: Record<string, any>) {
    const products = await this.prisma.product.aggregate({
      _count: true,
    });

    const activeProducts = await this.prisma.product.count({
      where: { status: 'ACTIVE' },
    });

    return {
      totalProducts: products._count,
      activeProducts,
      inactiveProducts: products._count - activeProducts,
      generatedAt: new Date(),
    };
  }

  private async generateHealthReport(filters: Record<string, any>) {
    const assessmentCount = await this.prisma.assessment.count();
    const healthProfileCount = await this.prisma.healthProfile.count();

    return {
      totalAssessments: assessmentCount,
      totalHealthProfiles: healthProfileCount,
      generatedAt: new Date(),
    };
  }
}
