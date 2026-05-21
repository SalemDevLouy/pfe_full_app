import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthResponse, AuthResponseUser, AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto): Promise<AuthResponse> {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto): Promise<AuthResponse> {
    return this.authService.login(loginAuthDto);
  }

  @Get('profile')
  profile(
    @Headers('authorization') authorization?: string,
  ): Promise<AuthResponseUser> {
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice(7)
      : '';

    return this.authService.profile(accessToken);
  }
}
