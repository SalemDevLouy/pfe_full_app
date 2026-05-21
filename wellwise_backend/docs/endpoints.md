# Health & Wellness AI E-Commerce API Endpoints

Base URL:

```bash
/api/v1
```

---

# Authentication

## Public Auth Routes

### Register

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

### Logout

```http
POST /auth/logout
```

### Refresh Token

```http
POST /auth/refresh
```

### Forgot Password

```http
POST /auth/forgot-password
```

### Reset Password

```http
POST /auth/reset-password
```

### Verify Email

```http
POST /auth/verify-email
```

### Resend Verification Code

```http
POST /auth/resend-verification
```

---

# User Routes

Base:

```bash
/api/v1/user
```

---

# User Profile

### Get Profile

```http
GET /user/profile
```

### Update Profile

```http
PUT /user/profile
```

### Upload Avatar

```http
POST /user/profile/avatar
```

### Delete Avatar

```http
DELETE /user/profile/avatar
```

### Change Password

```http
PUT /user/profile/password
```

### Delete Account

```http
DELETE /user/profile
```

---

# Health Profile

### Get Health Data

```http
GET /user/health-profile
```

### Update Health Data

```http
PUT /user/health-profile
```

### Update Goals

```http
PUT /user/health-profile/goals
```

### Update Preferences

```http
PUT /user/health-profile/preferences
```

### Connect External Data

```http
POST /user/health-profile/connections
```

---

# Assessments

### Start Assessment

```http
POST /user/assessments/start
```

### Submit Assessment

```http
POST /user/assessments/submit
```

### Get Assessment History

```http
GET /user/assessments
```

### Get Assessment Details

```http
GET /user/assessments/:id
```

### Delete Assessment

```http
DELETE /user/assessments/:id
```

---

# Wellness Scores

### Get Health Scores

```http
GET /user/wellness-scores
```

### Get Stress Score

```http
GET /user/wellness-scores/stress
```

### Get Sleep Score

```http
GET /user/wellness-scores/sleep
```

### Get Focus Score

```http
GET /user/wellness-scores/focus
```

### Get Global Health Score

```http
GET /user/wellness-scores/global
```

---

# Recommendations

### Get Personalized Recommendations

```http
GET /user/recommendations
```

### Get Recommended Products

```http
GET /user/recommendations/products
```

### Get Recommended Habits

```http
GET /user/recommendations/habits
```

### Get Recommended Wellness Plans

```http
GET /user/recommendations/plans
```

### Save Recommendation

```http
POST /user/recommendations/:id/save
```

### Hide Recommendation

```http
POST /user/recommendations/:id/hide
```

### Rate Recommendation

```http
POST /user/recommendations/:id/rate
```

---

# Progress Tracking

### Get Progress Overview

```http
GET /user/progress
```

### Get Weekly Progress

```http
GET /user/progress/weekly
```

### Get Monthly Progress

```http
GET /user/progress/monthly
```

### Get Sleep Evolution

```http
GET /user/progress/sleep
```

### Get Stress Evolution

```http
GET /user/progress/stress
```

### Get Focus Evolution

```http
GET /user/progress/focus
```

---

# Wellness Plans

### Get Plans

```http
GET /user/plans
```

### Get Plan Details

```http
GET /user/plans/:id
```

### Join Plan

```http
POST /user/plans/:id/join
```

### Leave Plan

```http
POST /user/plans/:id/leave
```

### Update Plan Progress

```http
PUT /user/plans/:id/progress
```

---

# Habits

### Get Habits

```http
GET /user/habits
```

### Create Habit

```http
POST /user/habits
```

### Update Habit

```http
PUT /user/habits/:id
```

### Delete Habit

```http
DELETE /user/habits/:id
```

### Complete Habit

```http
POST /user/habits/:id/complete
```

---

# Cart

### Get Cart

```http
GET /user/cart
```

### Add Product To Cart

```http
POST /user/cart/items
```

### Update Cart Item

```http
PUT /user/cart/items/:id
```

### Remove Cart Item

```http
DELETE /user/cart/items/:id
```

### Clear Cart

```http
DELETE /user/cart
```

---

# Orders

### Create Order

```http
POST /user/orders
```

### Get Orders

```http
GET /user/orders
```

### Get Order Details

```http
GET /user/orders/:id
```

### Cancel Order

```http
POST /user/orders/:id/cancel
```

### Track Order

```http
GET /user/orders/:id/tracking
```

---

# Payments

### Checkout

```http
POST /user/payments/checkout
```

### Payment Success

```http
POST /user/payments/success
```

### Payment Failed

```http
POST /user/payments/failed
```

### Get Payment History

```http
GET /user/payments/history
```

---

# Reviews

### Create Review

```http
POST /user/reviews
```

### Update Review

```http
PUT /user/reviews/:id
```

### Delete Review

```http
DELETE /user/reviews/:id
```

### Get My Reviews

```http
GET /user/reviews
```

---

# Notifications

### Get Notifications

```http
GET /user/notifications
```

### Mark Notification Read

```http
PUT /user/notifications/:id/read
```

### Mark All Read

```http
PUT /user/notifications/read-all
```

---

# Uploads

### Upload File

```http
POST /user/uploads
```

### Delete File

```http
DELETE /user/uploads/:id
```

---

# Public Routes

Base:

```bash
/api/v1
```

---

# Products

### Get Products

```http
GET /products
```

### Get Product Details

```http
GET /products/:id
```

### Search Products

```http
GET /products/search
```

### Filter Products

```http
GET /products/filter
```

### Get Trending Products

```http
GET /products/trending
```

### Get Featured Products

```http
GET /products/featured
```

---

# Categories

### Get Categories

```http
GET /categories
```

### Get Category Products

```http
GET /categories/:id/products
```

---

# Reviews

### Get Product Reviews

```http
GET /products/:id/reviews
```

---

# Search

### Global Search

```http
GET /search
```

---

# Admin Routes

Base:

```bash
/api/v1/admin
```

---

# Admin Dashboard

### Dashboard Analytics

```http
GET /admin/dashboard
```

### Dashboard KPIs

```http
GET /admin/dashboard/kpis
```

---

# Admin Users

### Get Users

```http
GET /admin/users
```

### Get User Details

```http
GET /admin/users/:id
```

### Block User

```http
POST /admin/users/:id/block
```

### Unblock User

```http
POST /admin/users/:id/unblock
```

### Delete User

```http
DELETE /admin/users/:id
```

---

# Admin Products

### Create Product

```http
POST /admin/products
```

### Update Product

```http
PUT /admin/products/:id
```

### Delete Product

```http
DELETE /admin/products/:id
```

### Upload Product Images

```http
POST /admin/products/:id/images
```

### Change Product Status

```http
PUT /admin/products/:id/status
```

---

# Admin Categories

### Create Category

```http
POST /admin/categories
```

### Update Category

```http
PUT /admin/categories/:id
```

### Delete Category

```http
DELETE /admin/categories/:id
```

---

# Admin Orders

### Get Orders

```http
GET /admin/orders
```

### Get Order Details

```http
GET /admin/orders/:id
```

### Update Order Status

```http
PUT /admin/orders/:id/status
```

### Refund Order

```http
POST /admin/orders/:id/refund
```

---

# Admin Assessments

### Get Assessment Analytics

```http
GET /admin/assessments/analytics
```

### Get User Assessments

```http
GET /admin/assessments/user/:id
```

---

# Admin Reviews

### Get Reviews

```http
GET /admin/reviews
```

### Delete Review

```http
DELETE /admin/reviews/:id
```

### Hide Review

```http
POST /admin/reviews/:id/hide
```

---

# Admin Recommendations

### Get Recommendation Analytics

```http
GET /admin/recommendations/analytics
```

### Trigger Recommendation Recalculation

```http
POST /admin/recommendations/recalculate
```

---

# Admin Analytics

### Sales Analytics

```http
GET /admin/analytics/sales
```

### User Analytics

```http
GET /admin/analytics/users
```

### Product Analytics

```http
GET /admin/analytics/products
```

### Health Analytics

```http
GET /admin/analytics/health
```

---

# Admin Reports

### Generate Report

```http
POST /admin/reports/generate
```

### Get Reports

```http
GET /admin/reports
```

### Download Report

```http
GET /admin/reports/:id/download
```

---

# Admin Notifications

### Send Notification

```http
POST /admin/notifications/send
```

### Broadcast Notification

```http
POST /admin/notifications/broadcast
```

---

# AI Routes

Base:

```bash
/api/v1/ai
```

---

# AI Insights

### Generate Health Insights

```http
POST /ai/insights/generate
```

### Get AI Health Summary

```http
GET /ai/insights/summary
```

---

# AI Recommendations

### Generate Recommendations

```http
POST /ai/recommendations/generate
```

### Explain Recommendation

```http
GET /ai/recommendations/:id/explain
```

---

# AI Scoring

### Recalculate Wellness Score

```http
POST /ai/scoring/recalculate
```

---

# AI Risk Detection

### Analyze Health Risk

```http
POST /ai/risk-detection/analyze
```

---

# System Routes

### Health Check

```http
GET /health
```

### API Status

```http
GET /status
```
