import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [totalUsers, totalOrders, totalProducts, totalRevenue] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.order.count(),
      this.prisma.product.count(),
      this.prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),
    ]);

    const paidOrders = await this.prisma.order.count({
      where: { status: 'PAID' },
    });

    const pendingOrders = await this.prisma.order.count({
      where: { status: 'PENDING' },
    });

    return {
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      paidOrders,
      pendingOrders,
      conversionRate: ((paidOrders / totalOrders) * 100).toFixed(2),
    };
  }

  async getRevenue() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const revenueData = await this.prisma.order.aggregate({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
        status: { in: ['PAID', 'DELIVERED'] },
      },
      _sum: {
        totalAmount: true,
      },
      _count: true,
    });

    const daily = await this.prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
        status: { in: ['PAID', 'DELIVERED'] },
      },
      _sum: {
        totalAmount: true,
      },
      _count: true,
    });

    return {
      totalRevenue: revenueData._sum.totalAmount || 0,
      totalOrders: revenueData._count,
      period: '30 days',
      daily: daily.map((d) => ({
        date: d.createdAt,
        revenue: d._sum.totalAmount || 0,
        orders: d._count,
      })),
    };
  }

  async getRecentOrders() {
    return this.prisma.order.findMany({
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTopProducts() {
    const topProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: true,
      _sum: {
        quantity: true,
      },
      orderBy: {
        _count: {
          productId: 'desc',
        },
      },
      take: 10,
    });

    const productsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
          select: {
            id: true,
            name: true,
            price: true,
            slug: true,
          },
        });

        return {
          product,
          orders: item._count,
          totalQuantity: item._sum.quantity || 0,
          revenue: (item._sum.quantity || 0) * Number(product?.price || 0),
        };
      }),
    );

    return productsWithDetails;
  }
}
