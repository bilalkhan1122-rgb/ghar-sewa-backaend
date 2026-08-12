<div align="center">

# nestjs-jwt-rbac-boilerplate

> Complete JWT authentication system with refresh token rotation, RBAC, and zero XSS risk

![nestjs-jwt-rbac-boilerplate Banner](banner.png)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?logo=nestjs)](https://nestjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Postman Collection](https://img.shields.io/badge/Postman-Collection-FF6C37?logo=postman)](https://web.postman.co/workspace/My-Workspace~f38931e2-b991-4b76-8f08-cd3c064519a2/collection/37117103-972a16b7-a0de-42de-b220-e1a872a4ffc1?action=share&source=copy-link&creator=37117103)
[![Medium Blog](https://img.shields.io/badge/Medium-Blog_Post-12100E?logo=medium)](https://medium.com/@sabin.shrestha.er/stop-rebuilding-auth-a-production-ready-jwt-rbac-template-for-nestjs-18d99f9b8944)

###  **If this saves you 40+ hours, ⭐ the repo**

---

## **Quick Start with CLI**

```bash
npx create-nestjs-auth@latest
```

Interactive scaffolding tool that sets up this entire boilerplate in a few steps. Configure database, JWT secrets, and dependencies automatically.

[GitHub](https://github.com/masabinhok/create-nestjs-auth) • [npm](https://www.npmjs.com/package/create-nestjs-auth)

</div>

---

## What This Solves

- **Problem**: Building secure JWT auth with refresh tokens in NestJS takes 40+ hours and requires deep security knowledge.
- **Solution**: This gives you a production-ready auth system in 3 minutes—tested patterns, no security holes.

## Why Choose This Over Alternatives?

| Feature | This Boilerplate | Passport JWT | NestJS Auth Samples | Custom JWT | Auth0/Clerk |
|---------|------------------|--------------|---------------------|------------|-------------|
| **Setup Time** | 3 minutes | 2-4 hours | 4-6 hours | 40+ hours | 1-2 hours |
| **Refresh Token Rotation** | Yes - Auto-rotation | No - Manual | No - Manual | No - Manual | Yes - Built-in |
| **Multi-Device Sessions** | Yes - 5 devices/user | No | No | No - Manual | Yes - Built-in |
| **HttpOnly Cookie Auth** | Yes - Zero XSS risk | Manual setup | Manual setup | No - Manual | Yes - Built-in |
| **RBAC Guards** | Yes - `@Roles()` decorator | Manual guards | Basic example | No - DIY | Yes - Built-in |
| **Rate Limiting** | Yes - Configured | No - Manual | No | No - Manual | Yes - Built-in |
| **Structured Logging** | Yes - Pino + PII redaction | No - Console | No | No - Manual | Yes - Built-in |
| **Database Integration** | Yes - Prisma + PostgreSQL | Your choice | TypeORM example | No - DIY | Managed |
| **Token Invalidation** | Yes - DB-backed | No - Stateless only | No | No - Manual | Yes - Built-in |
| **Brute-Force Protection** | Yes - 5 attempts/min | No - Manual | No | No - Manual | Yes - Built-in |
| **Health Checks** | Yes - K8s-ready probes | No - Manual | No | No - Manual | N/A |
| **Password Validation** | Yes - Regex + bcrypt 12 | Basic | No | No - Manual | Yes - Built-in |
| **E2E Tests** | Yes - Included | No - Manual | No | No - Manual | API tests |
| **Self-Hosted** | Yes - Free | Yes - Free | Yes - Free | Yes - Free | $25/mo+ |
| **No Vendor Lock-in** | Yes - Full control | Yes - Full control | Yes - Full control | Yes - Full control | No - Locked |
| **Production-Ready** | Yes - Day 1 | Needs work | No - Example only | No - Needs testing | Yes - Enterprise |

### The Real Cost of Alternatives

| Solution | Setup | Security Hardening | Testing | Maintenance | **Total** |
|----------|-------|-------------------|---------|-------------|-----------|
| **This Boilerplate** | 3 min | Done | Done | Minimal | **3 min** |
| **Passport JWT** | 2h | 8h (refresh, cookies) | 4h | Medium | **14h** |
| **Custom JWT** | 6h | 20h (all features) | 10h | High | **36h+** |
| **Auth0/Clerk** | 1h | Done | 2h | Vendor dependency | **3h + $$$** |

**Verdict**: Use this if you need production-grade auth without the 40-hour investment or monthly SaaS fees.

## Core Features

- **Token rotation**: Refresh tokens auto-rotate on each use—stolen tokens die immediately
- **Zero XSS risk**: HttpOnly cookies only—no localStorage, no client-side token access
- **RBAC in 2 lines**: Add `@Roles(UserRole.ADMIN)` to any endpoint—done
- **Multi-device sessions**: Track 5 devices per user with automatic cleanup
- **Brute-force protection**: Rate limiting: 5 auth attempts/minute, 10 requests/minute globally
- **PII-safe logs**: Pino structured logging—passwords/tokens auto-redacted
- **Bcrypt 12 rounds**: Industry-standard password hashing (2025 security baseline)

**Tech Stack**: NestJS 11.0, Prisma 6.19, PostgreSQL, Pino, Zod validation

## Requirements

- Node.js >= 20.x
- PostgreSQL >= 16.x
- npm >= 10.x

## 3-Minute Setup

### 1. Clone and Install

```bash
git clone https://github.com/masabinhok/nestjs-jwt-rbac-boilerplate.git
cd nestjs-jwt-rbac-boilerplate/api
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Generate secrets and edit `.env`:

```bash
# Generate JWT secrets
openssl rand -base64 32
```

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nest_auth_db"
JWT_ACCESS_SECRET="generated-secret-min-32-chars"
JWT_REFRESH_SECRET="another-generated-secret-min-32-chars"
JWT_ACCESS_EXPIRY="60m"
JWT_REFRESH_EXPIRY="30d"
NODE_ENV="development"
PORT="8080"
CORS_ORIGIN="http://localhost:3000"
LOG_LEVEL="info"
```

### 3. Database

```bash
npm run prisma:generate && npm run prisma:migrate && npm run prisma:seed
```

**Default credentials**: `admin@example.com` / `Admin@123`

### 4. Start & Verify

```bash
npm run start:dev
```

Verify it works:

```bash
curl http://localhost:8080/api/v1/health
```

Expected: `{"status":"ok","info":{"database":{"status":"up"}}...}`

## API Reference

Base URL: `http://localhost:8080/api/v1`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/customer/register` | Register a customer | No |
| POST | `/auth/provider/register` | Register a provider | No |
| POST | `/auth/login` | Login with credentials | No |
| POST | `/auth/google` | Sign up / log in with a Google ID token | No |
| POST | `/auth/verify-email` | Confirm email with a one-time token | No |
| POST | `/auth/forgot-password` | Request a password reset email | No |
| POST | `/auth/reset-password` | Set a new password with a reset token | No |
| POST | `/auth/refresh` | Refresh access token | Yes (refresh token) |
| POST | `/auth/logout` | Logout and invalidate tokens | Yes |
| GET | `/auth/me` | Get current user info | Yes |

#### POST /auth/google

**Request:** (the client obtains `idToken` from the Google Sign-In SDK)
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIs...",
  "role": "CUSTOMER"
}
```

**Behavior:**
- Verifies the token's signature, issuer, expiry and audience against `GOOGLE_CLIENT_ID` (plus any extra `GOOGLE_CLIENT_IDS`).
- Existing email → logs the account in and links the Google identity (account linking).
- New email → creates a Google account (no password/phone), sends a welcome email + a one-time email verification link, and issues tokens.
- `role` is only honored for new accounts (`CUSTOMER` or `PROVIDER`); it is ignored for existing users.

#### POST /auth/signup

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass@123",
  "fullName": "John Doe"
}
```

**Response 201:**
```json
{
  "user": {
    "id": "cm3k5j8l90000xyz",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "USER"
  },
  "message": "User registered successfully"
}
```

**curl:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass@123","fullName":"Test User"}'
```

#### POST /auth/login

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

**Response 200:**
```json
{
  "user": {
    "id": "cm3k5j8l90000xyz",
    "email": "admin@example.com",
    "fullName": "Admin User",
    "role": "ADMIN"
  }
}
```

Sets cookies: `accessToken` (httpOnly, 1h), `refreshToken` (httpOnly, 30d)

**curl:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"admin@example.com","password":"Admin@123"}'
```

#### POST /auth/refresh

**Request:** No body (uses `refreshToken` cookie)

**Response 200:**
```json
{
  "message": "Tokens refreshed successfully"
}
```

**curl:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/refresh \
  -b cookies.txt \
  -c cookies.txt
```

#### POST /auth/logout

**Request:** No body

**Response 200:**
```json
{
  "message": "Logged out successfully"
}
```

**curl:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/logout -b cookies.txt
```

#### GET /auth/me

**Request:** No body (uses `accessToken` cookie)

**Response 200:**
```json
{
  "id": "cm3k5j8l90000xyz",
  "email": "admin@example.com",
  "fullName": "Admin User",
  "role": "ADMIN",
  "isActive": true,
  "createdAt": "2025-11-16T10:30:00.000Z",
  "updatedAt": "2025-11-16T10:30:00.000Z"
}
```

**curl:**
```bash
curl -X GET http://localhost:8080/api/v1/auth/me -b cookies.txt
```

### User Profile Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/profile` | Get own profile | Yes |
| PATCH | `/users/profile` | Update own profile | Yes |

#### GET /users/profile

**Response 200:**
```json
{
  "id": "cm3k5j8l90000xyz",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-11-16T10:30:00.000Z",
  "updatedAt": "2025-11-16T10:30:00.000Z"
}
```

**curl:**
```bash
curl -X GET http://localhost:8080/api/v1/users/profile -b cookies.txt
```

#### PATCH /users/profile

**Request:**
```json
{
  "fullName": "John Smith"
}
```

**Response 200:**
```json
{
  "id": "cm3k5j8l90000xyz",
  "email": "user@example.com",
  "fullName": "John Smith",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-11-16T10:30:00.000Z",
  "updatedAt": "2025-11-16T10:30:00.000Z"
}
```

**curl:**
```bash
curl -X PATCH http://localhost:8080/api/v1/users/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"fullName":"John Smith"}'
```

### Admin Endpoints

Requires `ADMIN` role. Returns 403 for non-admin users.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | List all users (paginated) | ADMIN |
| GET | `/users/:id` | Get user by ID | ADMIN |
| PATCH | `/users/:id` | Update user | ADMIN |
| DELETE | `/users/:id` | Soft delete user | ADMIN |

#### GET /users

**Query params:** `page` (default: 1), `limit` (default: 10, max: 100)

**Response 200:**
```json
{
  "data": [
    {
      "id": "cm3k5j8l90000xyz",
      "email": "user1@example.com",
      "fullName": "User One",
      "role": "USER",
      "isActive": true,
      "createdAt": "2025-11-16T10:30:00.000Z",
      "updatedAt": "2025-11-16T10:30:00.000Z"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

**curl:**
```bash
curl -X GET "http://localhost:8080/api/v1/users?page=1&limit=10" -b cookies.txt
```

#### GET /users/:id

**Response 200:**
```json
{
  "id": "cm3k5j8l90000xyz",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "USER",
  "isActive": true,
  "createdAt": "2025-11-16T10:30:00.000Z",
  "updatedAt": "2025-11-16T10:30:00.000Z"
}
```

**curl:**
```bash
curl -X GET http://localhost:8080/api/v1/users/cm3k5j8l90000xyz -b cookies.txt
```

#### PATCH /users/:id

**Request:**
```json
{
  "fullName": "Updated Name",
  "role": "ADMIN",
  "isActive": false
}
```

**Response 200:**
```json
{
  "id": "cm3k5j8l90000xyz",
  "email": "user@example.com",
  "fullName": "Updated Name",
  "role": "ADMIN",
  "isActive": false,
  "createdAt": "2025-11-16T10:30:00.000Z",
  "updatedAt": "2025-11-16T10:30:00.000Z"
}
```

**curl:**
```bash
curl -X PATCH http://localhost:8080/api/v1/users/cm3k5j8l90000xyz \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"role":"ADMIN"}'
```

#### DELETE /users/:id

Soft deletes user (sets `isActive: false`) and invalidates all refresh tokens.

**Response 200:**
```json
{
  "message": "User deleted successfully"
}
```

**curl:**
```bash
curl -X DELETE http://localhost:8080/api/v1/users/cm3k5j8l90000xyz -b cookies.txt
```

### Health Check Endpoints

Public endpoints (no auth required).

| Method | Endpoint | Description | Use Case |
|--------|----------|-------------|----------|
| GET | `/health` | Full health check with DB | Load balancer checks |
| GET | `/health/ready` | Readiness probe | Kubernetes readiness |
| GET | `/health/live` | Liveness probe | Kubernetes liveness |

#### GET /health

**Response 200:**
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```

**curl:**
```bash
curl http://localhost:8080/api/v1/health
```

#### GET /health/ready

**Response 200:**
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    },
    "application": {
      "status": "up",
      "uptime": 3600.5,
      "timestamp": "2025-11-16T10:30:00.000Z"
    }
  }
}
```

**curl:**
```bash
curl http://localhost:8080/api/v1/health/ready
```

#### GET /health/live

**Response 200:**
```json
{
  "status": "ok",
  "uptime": 3600.5,
  "timestamp": "2025-11-16T10:30:00.000Z",
  "pid": 12345
}
```

**curl:**
```bash
curl http://localhost:8080/api/v1/health/live
```

## How It Works

### Token Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as AuthService
    participant D as Database
    
    C->>A: POST /auth/login
    A->>D: Validate credentials
    A->>A: Generate JWT tokens
    A->>D: Store hashed refresh token
    A->>C: Set httpOnly cookies (accessToken + refreshToken)
    
    Note over C,A: 1 hour later...
    
    C->>A: POST /auth/refresh (cookie)
    A->>D: Find token in DB
    A->>A: Generate NEW tokens
    A->>D: Invalidate OLD token
    A->>C: Set new httpOnly cookies
```

### Adding a Role

```typescript
// 1. prisma/schema.prisma
enum UserRole { USER ADMIN MODERATOR }

// 2. Run migration
npm run prisma:migrate

// 3. Any controller
@Roles(UserRole.MODERATOR)
@Delete('posts/:id')
deletePost() { }
```

### Logging

```json
{"level":30,"msg":"POST /auth/login - 200","userId":"cm3k...","durationMs":42}
```

PII auto-redacted: passwords, tokens, cookies. Change via `LOG_LEVEL` env.

## Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | Yes | - | Access token secret (32+ chars) |
| `JWT_REFRESH_SECRET` | Yes | - | Refresh token secret (32+ chars) |
| `JWT_ACCESS_EXPIRY` | No | `60m` | Access token lifetime (format: `60m`, `1h`, `7d`) |
| `JWT_REFRESH_EXPIRY` | No | `30d` | Refresh token lifetime |
| `NODE_ENV` | No | `development` | `development`, `production`, or `test` |
| `PORT` | No | `8080` | Server port |
| `CORS_ORIGIN` | No | `http://localhost:3000` | Allowed origins (comma-separated) |
| `LOG_LEVEL` | No | `info` | `fatal`, `error`, `warn`, `info`, `debug`, `trace` |
| `GOOGLE_CLIENT_ID` | No* | - | Google OAuth client ID for `/auth/google` (endpoint returns 503 until set) |
| `GOOGLE_CLIENT_IDS` | No | - | Extra comma-separated Google client IDs (Android/iOS audiences) |
| `RESEND_API_KEY` | No* | - | Resend API key for transactional email (emails logged as stubs until set) |
| `EMAIL_FROM` | No | `Ghar Sewa <onboarding@resend.dev>` | Sender address (use a verified domain in production) |
| `FRONTEND_URL` | No | `http://localhost:3000` | Base URL used in verification/reset email links |
| `PUSHER_APP_ID` | No* | - | Pusher app id (realtime events for Modules 19-21) |
| `PUSHER_KEY` | No* | - | Pusher key (public — safe to ship to clients) |
| `PUSHER_SECRET` | No* | - | Pusher secret (server-only — never expose to clients) |
| `PUSHER_CLUSTER` | No* | - | Pusher cluster, e.g. `ap2` |

\* Required only for the feature to actually work, not to boot the app.

## Module 19 — Provider Ranking

Providers earn rank badges from completed jobs **and** average rating (both required):

| Rank | Completed jobs | Min avg rating |
|------|---------------|----------------|
| Bronze | 50 | 4.0 |
| Silver | 150 | 4.3 |
| Gold | 350 | 4.6 |
| Platinum | 600 | 4.8 |

- Thresholds are centralized in `src/modules/ranking/ranking.config.ts`.
- Ranks are re-evaluated automatically on customer-confirmed job completion and on review create/update/delete, and manually via admin endpoints — all through the same `RankingService`.
- Upgrades and downgrades are recorded in `provider_rank_history` and notify the provider (`RANK_UPGRADED` / `RANK_DOWNGRADED`).

**Endpoints**
- `GET /provider/rank` — own rank + details
- `GET /provider/rank/history` — own rank history
- `GET /admin/rankings` — list/filter by rank (admin)
- `GET /admin/rankings/stats` — rank distribution (admin)
- `GET /admin/rankings/:providerId/history` (admin)
- `POST /admin/rankings/:providerId/recalculate` (admin)
- `POST /admin/rankings/recalculate` — all providers (admin)

## Module 20 — Urgent Jobs

- `POST /jobs` accepts `isUrgent` (customer only). Urgent jobs expire in **6 hours** (normal: 24h); the expiry timestamp is always computed server-side.
- Urgent pending jobs float to the top of the provider feed (`GET /provider/jobs/feed`).
- Matching providers get a `URGENT_JOB_POSTED` notification instead of `NEW_JOB`.
- Expiry uses the existing expiresAt mechanism — a scheduled job (`*/15 * * * *`) now expires overdue jobs automatically; the admin endpoint `POST /admin/jobs/expire-overdue` still works.

## Module 21 — Analytics

Admin-only endpoints under `GET /admin/analytics/*` (all metrics computed live from existing data; no analytics tables):

- `/overview`, `/jobs`, `/revenue`, `/providers`, `/customers`, `/categories`, `/disputes`, `/bookings`
- Date windows: `range=today | last_7_days | last_30_days | custom` + `dateFrom`/`dateTo` (custom capped at 366 days).
- `GET /admin/analytics/export/csv` — CSV export (no dependencies).
- `GET /admin/analytics/export/pdf` — **placeholder**: returns 503 until a PDF library (e.g. `pdfkit`) is installed and wired into `AnalyticsExportService.exportPdf()`.

## Realtime (Pusher)

Pusher is the realtime delivery layer for Modules 19-21; the **database remains the source of truth**. The backend runs on serverless (Vercel), so there is no persistent WebSocket server — clients connect straight to Pusher.

### Configuration

```env
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret   # server-only, never exposed
PUSHER_CLUSTER=ap2
```

Without these vars the app still boots; events are logged as `[REALTIME-STUB]` (same pattern as the FCM push stub).

### Channel auth

`POST /realtime/pusher/auth` (JWT cookie required) signs private-channel subscriptions. Ownership is enforced from the JWT payload:

| Channel | Who may subscribe |
|---------|-------------------|
| `private-user-{userId}` | that user only |
| `private-provider-{providerId}` | that provider only |
| `private-admin` | ADMIN only |

A user can never obtain an auth token for another user's/provider's channel or the admin channel.

### Events

| Event | Channel | When | Payload |
|-------|---------|------|---------|
| `provider.rank.updated` | `private-provider-{id}` | rank changes (upgrade/downgrade) | `providerId`, `previousRank`, `newRank`, `timestamp` |
| `job.urgent.created` | `private-provider-{id}` (matching providers only) | urgent job posted | `jobId`, `title`, `categoryId`, `offeredPrice`, `isUrgent`, `expiresAt` |
| `job.urgent.expired` | `private-user-{customerId}` | urgent job expires | `jobId`, `title`, `isUrgent`, `expiredAt` |
| `job.urgent.accepted` | `private-user-{customerId}` + `private-provider-{providerId}` | urgent job accepted (direct booking / bid / counter-offer) | `jobId`, `bookingId`, `title`, `isUrgent`, `acceptedAt` |
| `analytics.updated` | `private-admin` | completion confirmed, review changed, bulk rank recalc | `reason`, `timestamp` |

### Reliability & security

- Events are published **after** the database operation commits — never before.
- Pusher failures are logged and swallowed: the business data (notifications, history) is never rolled back because realtime delivery failed.
- The Pusher secret never leaves the server; clients only hit the auth endpoint.
- Analytics events are never broadcast to customers/providers (admin channel only).

## Troubleshooting: Real Fixes

### JWT verification fails
**Symptom**: 401 on `/auth/me` after login  
**Fix**: `rm -rf node_modules && npm install && npm run prisma:generate`

### Database connection error
**Symptom**: "Can't reach database server"  
**Fix**: `pg_isready -h localhost -p 5432` then `npm run prisma:migrate`

### Token refresh fails
**Symptom**: 401 on `/auth/refresh`  
**Fix**: Clear cookies, login again: `curl -X POST ... -c cookies.txt`

### Port 8080 in use
**Symptom**: EADDRINUSE  
**Fix**: `lsof -ti:8080 | xargs kill -9 && npm run start:dev`

### CORS errors
**Symptom**: Browser shows `Access-Control-Allow-Origin` error  
**Fix**: Add your frontend URL to `CORS_ORIGIN` in `.env`, restart server

## Contributing

Fork, branch (`feature/name`), PR. Run `npm test` before PR. Keep changes minimal.

## License

MIT - see [LICENSE](LICENSE) file.

---

<div align="center">

**Built this? Please star the repo so others find it.**

Need help? [Open an issue](https://github.com/masabinhok/nestjs-jwt-rbac-boilerplate/issues) (response < 24h)

Built by [Sabin Shrestha](https://sabinshrestha69.com.np) • [GitHub](https://github.com/masabinhok)

</div>
