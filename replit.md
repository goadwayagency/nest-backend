# NestJS Backend Application

## Overview
This is a NestJS backend application with user authentication, JWT-based authorization, and PostgreSQL database support. The application provides a RESTful API for user management and authentication with a referral system.

## Current State
- **Status**: Running successfully on port 3000
- **Framework**: NestJS v11
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: JWT tokens
- **Last Updated**: November 12, 2025

## Project Architecture

### Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: NestJS
- **Database ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: class-validator, class-transformer
- **Real-time**: Socket.io (WebSockets support)
- **Email**: Brevo integration

### Directory Structure
```
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Database schema
├── src/
│   ├── auth/               # Authentication module
│   │   ├── dto/           # Data transfer objects
│   │   ├── jwt/           # JWT service and strategy
│   │   └── referral/      # Referral system
│   ├── users/             # User management module
│   └── main.ts            # Application entry point
└── test/                  # Test files
```

### Database Schema
- **User Model**: Manages user accounts with email, password, role (buyer/seller/admin), status, points, and referral tracking

### API Endpoints
- `GET /` - Health check endpoint
- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication

## Environment Variables
Required secrets (configured in Replit Secrets):
- `JWT_TOKEN` - Secret key for JWT token signing and verification
- `DATABASE_URL` - PostgreSQL connection string (auto-configured by Replit)
- `PORT` - Server port (defaults to 3000)

## Development

### Running the Application
The application runs automatically via the configured workflow:
```bash
npm run start:dev
```

### Available Scripts
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run start:dev` - Start development server with watch mode
- `npm run start:debug` - Start with debugging
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint and fix code

### Database Operations
```bash
npx prisma generate    # Generate Prisma client
npx prisma migrate dev # Create and apply migrations
npx prisma studio      # Open Prisma Studio GUI
```

## Features
- User authentication with JWT tokens
- Password hashing with bcrypt
- Referral system for user acquisition
- Global validation pipes
- PostgreSQL database with Prisma ORM
- WebSocket support for real-time features
- Email integration via Brevo

## Recent Changes
- **2025-11-12**: Initial project setup in Replit environment
  - Installed all dependencies
  - Configured PostgreSQL database
  - Applied database migrations
  - Configured backend workflow on port 3000
  - Verified server is running and responding correctly
