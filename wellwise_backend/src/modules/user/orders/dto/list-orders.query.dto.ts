import { OrderStatus } from '@prisma/client';

export class ListOrdersQueryDto {
  status?: OrderStatus;
}
