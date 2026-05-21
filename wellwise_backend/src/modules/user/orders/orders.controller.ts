import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { ListOrdersQueryDto } from './dto/list-orders.query.dto';
import { OrderIdParamDto } from './dto/order-id.param.dto';
import { OrdersService } from './orders.service';

@Controller('user/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async list(
    @CurrentUser() authUser: AuthUser,
    @Query() query: ListOrdersQueryDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.ordersService.list(authUser.userId, query);
  }

  @Get(':orderId')
  async getById(
    @CurrentUser() authUser: AuthUser,
    @Param() params: OrderIdParamDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.ordersService.getById(authUser.userId, params.orderId);
  }

  @Patch(':orderId/cancel')
  async cancel(
    @CurrentUser() authUser: AuthUser,
    @Param() params: OrderIdParamDto,
    @Body() dto: CancelOrderDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.ordersService.cancel(authUser.userId, params.orderId, dto);
  }
}
