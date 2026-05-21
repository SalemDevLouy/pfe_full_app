import { Module } from '@nestjs/common';
import { AdminProductsModule } from './products/admin-products.module';
import { AdminCategoriesModule } from './categories/admin-categories.module';
import { AdminOrdersModule } from './orders/admin-orders.module';
import { AdminReviewsModule } from './reviews/admin-reviews.module';
import { AdminUsersModule } from './users/admin-users.module';
import { AdminDashboardModule } from './dashboard/admin-dashboard.module';
import { AdminAnalyticsModule } from './analytics/admin-analytics.module';
import { AdminAssessmentsModule } from './assessments/admin-assessments.module';
import { AdminReportsModule } from './reports/admin-reports.module';

@Module({
  imports: [
    AdminProductsModule,
    AdminCategoriesModule,
    AdminOrdersModule,
    AdminReviewsModule,
    AdminUsersModule,
    AdminDashboardModule,
    AdminAnalyticsModule,
    AdminAssessmentsModule,
    AdminReportsModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    AdminProductsModule,
    AdminCategoriesModule,
    AdminOrdersModule,
    AdminReviewsModule,
    AdminUsersModule,
    AdminDashboardModule,
    AdminAnalyticsModule,
    AdminAssessmentsModule,
    AdminReportsModule,
  ],
})
export class AdminModule {}
