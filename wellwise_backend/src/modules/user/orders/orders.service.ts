import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { ListOrdersQueryDto } from './dto/list-orders.query.dto';

@Injectable()
export class OrdersService {
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

  async list(accessToken: string, query: ListOrdersQueryDto) {
    const userId = this.resolveUserId(accessToken);
    return this.prisma.order.findMany({
      where: {
        userId,
        status: query.status,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(accessToken: string, orderId: string) {
    const userId = this.resolveUserId(accessToken);
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payments: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async cancel(accessToken: string, orderId: string, dto: CancelOrderDto) {
    const userId = this.resolveUserId(accessToken);
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.PROCESSING) {
      throw new BadRequestException('Order can no longer be cancelled');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CANCELLED,
        trackingNumber: dto.reason ? order.trackingNumber : order.trackingNumber,
      },
    });
  }
}
