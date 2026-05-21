# Authentication System Documentation

This app now has a complete authentication system built with NextAuth.js, supporting email/password authentication with password reset functionality.

## Features

- **Sign Up**: Create new accounts with email and password
- **Sign In**: Login with credentials
- **Forgot Password**: Request password reset
- **Reset Password**: Update password with secure token
- **Protected Routes**: Private routes require authentication
- **Public Routes**: Public routes are accessible without authentication

## Architecture

### Authentication Flow

```
Public Routes (signin, signup, forgot-password, reset-password)
              ↓
         Cookie Session
              ↓
Protected Routes (dashboard, profile, etc.)
```

## Routes

### Public Routes
- `/signin` - Sign in page
- `/signup` - Registration page
- `/forgot-password` - Request password reset
- `/reset-password?token=xxx&email=xxx` - Reset password page
- `/login` - Legacy login page (can be kept or removed)

### Protected Routes
All routes under `/(main)/` require authentication:
- `/dashboard`
- `/profile`
- `/cart`
- `/store`
- `/assessment`
- `/tracker`
- `/insights`
- `/product-details`

## API Endpoints

### Authentication APIs

**POST /api/auth/signin**
- Used by NextAuth.js credentials provider
- Handles email/password validation

**POST /api/auth/signup**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```
Response:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**POST /api/auth/reset-password**
```json
{
  "email": "john@example.com"
}
```
Response:
```json
{
  "message": "If email exists, reset link has been sent"
}
```

**POST /api/auth/reset-password/confirm**
```json
{
  "email": "john@example.com",
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

## Database Schema

The following models are used:

### User
- `id`: Unique identifier
- `email`: User email (unique)
- `name`: User name
- `password`: Hashed password
- `image`: Profile image URL
- `emailVerified`: Email verification timestamp
- Relations: accounts, sessions

### Account (OAuth)
- External provider accounts linked to users

### Session
- Active user sessions
- Auto-expires after 30 days

### VerificationToken
- Password reset tokens
- Expire after 24 hours

## Setup Instructions

### 1. Environment Variables
Add to `.env`:
```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
```

### 2. Database Setup
The Prisma schema is already configured. Run:
```bash
npx prisma db push
```

### 3. Install Dependencies
All dependencies are already installed:
- `bcryptjs` - Password hashing
- `nodemailer` - Email sending (configured in reset-password API)
- `next-auth` - Authentication
- `@prisma/client` - Database ORM

## Usage Examples

### Using `useAuth()` Hook in Components

```typescript
"use client";

import { useAuth } from "@/lib/hooks/use-auth";

export function MyComponent() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <p>Please sign in</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using `useSession()` Hook (NextAuth)

```typescript
"use client";

import { useSession } from "next-auth/react";

export function MyComponent() {
  const { data: session } = useSession();

  return <p>Logged in as: {session?.user?.email}</p>;
}
```

### Accessing Session Server-Side

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Use session.user.id or session.user.email
  return new Response(JSON.stringify(session));
}
```

### Adding AuthMenu to Navbar

```typescript
import { AuthMenu } from "@/app/_components/auth-menu";

export function MainNav() {
  return (
    <nav>
      <AuthMenu />
    </nav>
  );
}
```

## Password Hashing

Passwords are hashed using bcryptjs with:
- `saltRounds: 10`
- Minimum length: 8 characters

## Security Considerations

1. **Password Reset**: Tokens expire after 24 hours
2. **Session**: Sessions expire after 30 days
3. **Credentials**: Never exposed in logs or responses
4. **HTTPS**: Use HTTPS in production
5. **NEXTAUTH_SECRET**: Change in production (generate: `openssl rand -base64 32`)

## Testing Authentication

### Test Sign Up
1. Go to http://localhost:3000/signup
2. Fill in email, name, and password
3. You'll be auto-logged in after signup

### Test Sign In
1. Go to http://localhost:3000/signin
2. Enter your credentials
3. You'll be redirected to dashboard

### Test Password Reset
1. Go to http://localhost:3000/forgot-password
2. Enter your email (token logged to console in development)
3. Copy the token and visit: `/reset-password?token=xxx&email=your-email@example.com`
4. Enter new password

## Customization

### Changing Session Timeout
Edit `/app/api/auth/[...nextauth]/route.ts`:
```typescript
session: {
  maxAge: 7 * 24 * 60 * 60, // 7 days instead of 30
}
```

### Adding OAuth Providers
Add to NextAuth providers:
```typescript
import GoogleProvider from "next-auth/providers/google";

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  // ... existing providers
]
```

### Customizing Login Pages
Edit pages in:
- `/app/signin/page.tsx`
- `/app/signup/page.tsx`
- `/app/forgot-password/page.tsx`
- `/app/reset-password/page.tsx`

## Middleware

Route protection is handled by middleware in `/middleware.ts`:

```typescript
// Public routes (no auth required)
- /signin
- /signup
- /forgot-password
- /reset-password

// Protected routes (auth required)
- All other routes
```

## Email Configuration (Optional)

To enable password reset emails, update `/app/api/auth/reset-password/route.ts`:

```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Password Reset",
  html: `Click here to reset: ${resetLink}`,
});
```

And add to `.env`:
```
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
```

## Troubleshooting

### Issue: "Invalid credentials" error
- Check email is in database
- Verify password is correct
- Ensure bcryptjs is comparing correctly

### Issue: Sessions not persisting
- Check NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your domain
- Check browser cookies are enabled

### Issue: Routes not protected
- Ensure middleware.ts exists in root
- Restart dev server after middleware changes
- Check route patterns in middleware.ts

## Next Steps

1. ✅ Authentication system is ready
2. Test sign up, sign in, and password reset
3. Add email notifications for password reset
4. Create user profile page
5. Add user preferences/settings
6. Implement role-based access control (admin, user, etc.)

---

For questions or issues, check NextAuth.js documentation: https://next-auth.js.org/
