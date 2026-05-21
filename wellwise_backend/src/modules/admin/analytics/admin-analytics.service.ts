import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AdminAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserGrowth() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const daily = await this.prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: true,
    });

    const totalUsers = await this.prisma.user.count();

    return {
      totalUsers,
      period: '30 days',
      daily: daily.map((d) => ({
        date: d.createdAt,
        newUsers: d._count,
      })),
    };
  }

  async getOrderTrends() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const daily = await this.prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: true,
      _sum: {
        totalAmount: true,
      },
    });

    return {
      period: '30 days',
      daily: daily.map((d) => ({
        date: d.createdAt,
        orders: d._count,
        revenue: d._sum.totalAmount || 0,
      })),
    };
  }

  async getProductPerformance(take: number = 20) {
    const products = await this.prisma.product.findMany({
      take,
      include: {
        reviews: true,
        orderItems: true,
        _count: {
          select: {
            reviews: true,
            orderItems: true,
            cartItems: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      orderCount: product._count.orderItems,
      reviewCount: product._count.reviews,
      averageRating: product.reviews.length
        ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(2)
        : 0,
      cartCount: product._count.cartItems,
    }));
  }

  async getCategoryStats() {
    const categories = await this.prisma.category.findMany({
      include: {
        products: {
          include: {
            product: {
              include: {
                orderItems: true,
              },
            },
          },
        },
      },
    });

    return categories.map((category) => {
      const totalOrders = category.products.reduce(
        (sum, pc) => sum + pc.product.orderItems.length,
        0,
      );
      const totalRevenue = category.products.reduce(
        (sum, pc) =>
          sum +
          pc.product.orderItems.reduce((s, oi) => s + Number(oi.unitPrice) * oi.quantity, 0),
        0,
      );

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        productCount: category.products.length,
        totalOrders,
        totalRevenue,
      };
    });
  }
}
