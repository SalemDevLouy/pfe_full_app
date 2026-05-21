import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AnalyticsService {
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

  async getSummary(accessToken: string) {
    const userId = this.resolveUserId(accessToken);

    const [orders, cart, assessmentsSubmitted, latestWellness] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        select: { totalAmount: true, status: true },
      }),
      this.prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      }),
      this.prisma.assessment.count({
        where: { userId, status: 'SUBMITTED' },
      }),
      this.prisma.wellnessScore.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalSpent = orders.reduce(
      (sum, order) => sum + Number(order.totalAmount),
      0,
    );

    const completedOrders = orders.filter((order) => order.status === 'DELIVERED').length;
    const pendingOrders = orders.filter(
      (order) => order.status === 'PENDING' || order.status === 'PROCESSING',
    ).length;

    const cartItems = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    return {
      ordersCount: orders.length,
      completedOrders,
      pendingOrders,
      totalSpent,
      cartItems,
      assessmentsSubmitted,
      latestWellness,
    };
  }

  async getTrends(accessToken: string) {
    const userId = this.resolveUserId(accessToken);
    const now = new Date();
    const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [wellness, orders] = await Promise.all([
      this.prisma.wellnessScore.findMany({
        where: {
          userId,
          createdAt: { gte: start },
        },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.order.groupBy({
        by: ['status'],
        where: {
          userId,
          createdAt: { gte: start },
        },
        _count: {
          _all: true,
        },
        _sum: {
          totalAmount: true,
        },
      }),
    ]);

    return {
      periodDays: 30,
      wellness,
      orderBreakdown: orders.map((entry) => ({
        status: entry.status,
        count: entry._count._all,
        amount: Number((entry._sum as Prisma.OrderSumAggregateOutputType).totalAmount ?? 0),
      })),
    };
  }
}
