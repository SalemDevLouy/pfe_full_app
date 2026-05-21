import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartService } from './cart.service';

@Controller('user/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.cartService.getCart(authUser.userId);
  }

  @Post('items')
  async addItem(@CurrentUser() authUser: AuthUser, @Body() dto: AddCartItemDto) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.cartService.addItem(authUser.userId, dto);
  }

  @Patch('items/:itemId')
  async updateItem(
    @CurrentUser() authUser: AuthUser,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.cartService.updateItem(authUser.userId, itemId, dto);
  }

  @Delete('items/:itemId')
  async removeItem(
    @CurrentUser() authUser: AuthUser,
    @Param('itemId') itemId: string,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.cartService.removeItem(authUser.userId, itemId);
  }

  @Post('checkout')
  async checkout(@CurrentUser() authUser: AuthUser, @Body() dto: CheckoutDto) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.cartService.checkout(authUser.userId, dto);
  }
}
