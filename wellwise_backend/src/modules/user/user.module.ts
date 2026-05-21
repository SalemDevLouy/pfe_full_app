import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { CartModule } from './cart/cart.module';
import { HealthModule } from './health/health.module';
import { OrdersModule } from './orders/orders.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ProfileModule } from './profile/profile.module';
import { UploadsModule } from './uploads/uploads.module';
import { WellnessModule } from './wellness/wellness.module';

@Module({
  imports: [
    ProfileModule,
    HealthModule,
    AssessmentsModule,
    CartModule,
    OrdersModule,
    AnalyticsModule,
    RecommendationsModule,
    ReviewsModule,
    UploadsModule,
    WellnessModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {}
