import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('user/reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Get()
	async list(@CurrentUser() authUser: AuthUser) {
		if (!authUser.userId) {
			throw new BadRequestException('Authorization header is required');
		}
		return this.reviewsService.list(authUser.userId);
	}

	@Get(':reviewId')
	async getById(
		@CurrentUser() authUser: AuthUser,
		@Param('reviewId') reviewId: string,
	) {
		if (!authUser.userId) {
			throw new BadRequestException('Authorization header is required');
		}
		return this.reviewsService.getById(authUser.userId, reviewId);
	}

	@Post()
	async create(
		@CurrentUser() authUser: AuthUser,
		@Body() dto: CreateReviewDto,
	) {
		if (!authUser.userId) {
			throw new BadRequestException('Authorization header is required');
		}
		return this.reviewsService.create(authUser.userId, dto);
	}

	@Put(':reviewId')
	async update(
		@CurrentUser() authUser: AuthUser,
		@Param('reviewId') reviewId: string,
		@Body() dto: UpdateReviewDto,
	) {
		if (!authUser.userId) {
			throw new BadRequestException('Authorization header is required');
		}
		return this.reviewsService.update(authUser.userId, reviewId, dto);
	}

	@Delete(':reviewId')
	async delete(
		@CurrentUser() authUser: AuthUser,
		@Param('reviewId') reviewId: string,
	) {
		if (!authUser.userId) {
			throw new BadRequestException('Authorization header is required');
		}
		return this.reviewsService.delete(authUser.userId, reviewId);
	}
}
