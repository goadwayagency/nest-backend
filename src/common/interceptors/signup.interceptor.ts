import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SignupInterceptor implements NestInterceptor {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((user) => {
        this.eventEmitter.emit('user.signedUp', { user });
      }),
    );
  }
}
