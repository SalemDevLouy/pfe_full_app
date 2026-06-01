import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class RecommendationsService {
  private readonly engineUrl: string;

  constructor() {
    this.engineUrl = process.env.RECOMMENDATION_ENGINE_URL ?? 'http://localhost:8000';
  }

  private async call<T>(path: string): Promise<T> {
    const url = `${this.engineUrl}${path}`;
    let response: Response;
    try {
      response = await fetch(url);
    } catch {
      throw new InternalServerErrorException('Recommendation engine is unreachable');
    }
    if (!response.ok) {
      throw new InternalServerErrorException('Recommendation engine returned an error');
    }
    return response.json() as Promise<T>;
  }

  forYou(userId: string, limit = 10) {
    return this.call(`/recommendations/for-you?user_id=${userId}&limit=${limit}`);
  }

  similar(productId: string, limit = 5) {
    return this.call(`/recommendations/similar/${productId}?limit=${limit}`);
  }

  categories(userId: string, limit = 5) {
    return this.call(`/recommendations/categories?user_id=${userId}&limit=${limit}`);
  }

  goalBased(userId: string, limit = 10) {
    return this.call(`/recommendations/goal-based?user_id=${userId}&limit=${limit}`);
  }

  frequentlyBoughtTogether(productId: string, limit = 5) {
    return this.call(`/recommendations/frequently-bought-together/${productId}?limit=${limit}`);
  }

  crossSell(productId: string, userId: string | undefined, limit = 5) {
    const userParam = userId ? `&user_id=${userId}` : '';
    return this.call(`/recommendations/cross-sell/${productId}?limit=${limit}${userParam}`);
  }

  newArrivals(userId: string | undefined, limit = 10) {
    const userParam = userId ? `&user_id=${userId}` : '';
    return this.call(`/recommendations/new-arrivals?limit=${limit}${userParam}`);
  }

  hybrid(userId: string, limit = 10) {
    return this.call(`/recommendations/hybrid?user_id=${userId}&limit=${limit}`);
  }

  collaborative(userId: string, limit = 10) {
    return this.call(`/recommendations/collaborative?user_id=${userId}&limit=${limit}`);
  }
}
