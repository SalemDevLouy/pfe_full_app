import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { createHash, randomBytes, randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

export interface AuthResponseUser {
	id: string;
	name: string;
	email: string;
	age?: number;
	gender?: string;
}

export interface AuthResponse {
	accessToken: string;
	user: AuthResponseUser;
}

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService) {}
	private readonly sessions = new Map<string, string>();

	getSessionUserId(accessToken: string): string | undefined {
		return this.sessions.get(accessToken);
	}

	async register(registerAuthDto: RegisterAuthDto): Promise<AuthResponse> {
		this.assertRegistrationPayload(registerAuthDto);

		const email = registerAuthDto.email.trim().toLowerCase();

		const existingUser = await this.prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			throw new BadRequestException('Email is already registered');
		}

		const salt = randomBytes(16).toString('hex');
		const passwordHash = this.hashPassword(registerAuthDto.password, salt);
		const user = await this.prisma.user.create({
			data: {
				name: registerAuthDto.name.trim(),
				email,
				passwordHash: `${salt}:${passwordHash}`,
				age: registerAuthDto.age,
				gender: registerAuthDto.gender?.trim(),
			},
		});

		return this.createSession(user);
	}

	async login(loginAuthDto: LoginAuthDto): Promise<AuthResponse> {
		this.assertLoginPayload(loginAuthDto);

		const email = loginAuthDto.email.trim().toLowerCase();
		const user = await this.prisma.user.findUnique({
			where: { email },
		});

		if (!user || !this.verifyPassword(loginAuthDto.password, user.passwordHash)) {
			throw new UnauthorizedException('Invalid email or password');
		}

		return this.createSession(user);
	}

	async profile(accessToken: string): Promise<AuthResponseUser> {
		const userId = this.sessions.get(accessToken);

		if (!userId) {
			throw new UnauthorizedException('Invalid or expired session');
		}

		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new UnauthorizedException('Invalid or expired session');
		}

		return this.toResponseUser(user);
	}

	private createSession(user: User): AuthResponse {
		const accessToken = randomUUID();
		this.sessions.set(accessToken, user.id);

		return {
			accessToken,
			user: this.toResponseUser(user),
		};
	}

	private hashPassword(password: string, salt: string): string {
		return createHash('sha256').update(`${salt}:${password}`).digest('hex');
	}

	private verifyPassword(password: string, storedPassword: string): boolean {
		const [salt, hash] = storedPassword.split(':');

		if (!salt || !hash) {
			return false;
		}

		return this.hashPassword(password, salt) === hash;
	}

	private toResponseUser(user: User): AuthResponseUser {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			age: user.age ?? undefined,
			gender: user.gender ?? undefined,
		};
	}

	private assertRegistrationPayload(registerAuthDto: RegisterAuthDto): void {
		if (!registerAuthDto.name?.trim()) {
			throw new BadRequestException('Name is required');
		}

		if (!registerAuthDto.email?.trim()) {
			throw new BadRequestException('Email is required');
		}

		if (!registerAuthDto.password?.trim() || registerAuthDto.password.length < 6) {
			throw new BadRequestException('Password must be at least 6 characters');
		}
	}

	private assertLoginPayload(loginAuthDto: LoginAuthDto): void {
		if (!loginAuthDto.email?.trim()) {
			throw new BadRequestException('Email is required');
		}

		if (!loginAuthDto.password?.trim()) {
			throw new BadRequestException('Password is required');
		}
	}
}
