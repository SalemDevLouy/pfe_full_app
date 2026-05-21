import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  userId: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers.authorization || '';
    const accessToken = authorization.startsWith('Bearer ')
      ? authorization.slice(7)
      : '';

    // Store the token; it will be resolved by services using AuthService
    return { userId: accessToken };
  },
);
