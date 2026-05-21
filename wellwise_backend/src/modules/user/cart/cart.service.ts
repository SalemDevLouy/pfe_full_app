import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
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

  private async ensureCart(userId: string) {
    return this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  }

  async getCart(accessToken: string) {
    const userId = this.resolveUserId(accessToken);
    await this.ensureCart(userId);

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const subtotal = (cart?.items ?? []).reduce(
      (sum, item) => sum + Number(item.unitPrice) * item.quantity,
      0,
    );

    return {
      ...cart,
      subtotal,
    };
  }

  async addItem(accessToken: string, dto: AddCartItemDto) {
    const userId = this.resolveUserId(accessToken);
    if (!dto.productId) {
      throw new BadRequestException('productId is required');
    }
    if (!dto.quantity || dto.quantity < 1) {
      throw new BadRequestException('quantity must be at least 1');
    }

    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = await this.ensureCart(userId);
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId,
        },
      },
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + dto.quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: dto.productId,
          quantity: dto.quantity,
          unitPrice: product.price,
        },
      });
    }

    return this.getCart(accessToken);
  }

  async updateItem(accessToken: string, itemId: string, dto: UpdateCartItemDto) {
    const userId = this.resolveUserId(accessToken);
    if (!dto.quantity || dto.quantity < 1) {
      throw new BadRequestException('quantity must be at least 1');
    }

    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          userId,
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });

    return this.getCart(accessToken);
  }

  async removeItem(accessToken: string, itemId: string) {
    const userId = this.resolveUserId(accessToken);
    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          userId,
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({ where: { id: itemId } });
    return this.getCart(accessToken);
  }

  async checkout(accessToken: string, dto: CheckoutDto) {
    const userId = this.resolveUserId(accessToken);
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    const items = cart?.items ?? [];
    if (!cart || items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.unitPrice) * item.quantity,
      0,
    );
    const shippingAmount = dto.shippingAmount ?? 0;
    const taxAmount = dto.taxAmount ?? 0;
    const totalAmount = subtotal + shippingAmount + taxAmount;

    const order = await this.prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId,
          status: OrderStatus.PENDING,
          subtotal,
          shippingAmount,
          taxAmount,
          totalAmount,
          shippingAddress: dto.shippingAddress as never,
          billingAddress: dto.billingAddress as never,
          placedAt: new Date(),
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return createdOrder;
    });

    return order;
  }
}
