import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
// import { NotificationService } from 'src/notifications/services/notification.service';

@Injectable()
export class SignupListener {
  // constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('user.signedUp', { async: true })
  async handleUserSignedUp(payload: { user: any }) {
    console.log('User signed up event received:', payload.user.email);
    
  }
}
