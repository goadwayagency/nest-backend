// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token);

      // Normalize JWT payload
      request['user'] = {
        id: payload.sub,    // <— normalized ID
        email: payload.email
      };

      return true;
    } catch (e) {
      console.error('JWT verification failed:', e);
      return false;
    }
  }
}
