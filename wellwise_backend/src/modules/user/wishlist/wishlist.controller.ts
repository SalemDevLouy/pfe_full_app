import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import { WishlistService } from './wishlist.service';

@Controller('user/wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  list(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) throw new BadRequestException('Authorization required');
    return this.wishlistService.list(authUser.userId);
  }

  @Get('check/:productId')
  check(@CurrentUser() authUser: AuthUser, @Param('productId') productId: string) {
    if (!authUser.userId) throw new BadRequestException('Authorization required');
    return this.wishlistService.check(authUser.userId, productId).then(liked => ({ liked }));
  }

  @Post()
  add(@CurrentUser() authUser: AuthUser, @Body('productId') productId: string) {
    if (!authUser.userId) throw new BadRequestException('Authorization required');
    if (!productId) throw new BadRequestException('productId is required');
    return this.wishlistService.add(authUser.userId, productId);
  }

  @Delete(':productId')
  remove(@CurrentUser() authUser: AuthUser, @Param('productId') productId: string) {
    if (!authUser.userId) throw new BadRequestException('Authorization required');
    return this.wishlistService.remove(authUser.userId, productId);
  }
}
