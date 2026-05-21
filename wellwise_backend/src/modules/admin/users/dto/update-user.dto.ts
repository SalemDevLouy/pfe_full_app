export class UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
  gender?: string;
  role?: 'USER' | 'ADMIN';
  isEmailVerified?: boolean;
}
