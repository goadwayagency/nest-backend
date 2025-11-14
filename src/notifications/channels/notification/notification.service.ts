import { Inject, Injectable } from '@nestjs/common';
import * as notificationsRepositoryInterface from 'src/notifications/interfaces/notifications-repository.interface';


@Injectable()
export class NotificationService {
    constructor(
        @Inject('INotificationsRepository')
        private readonly notificationRepo: notificationsRepositoryInterface.INotificationsRepository,
      ) {}
    async createNotification(userId: string, type: string, payload: any) {
        console.log('createNotification', userId, type, payload);
        return this.notificationRepo.createNotification(userId, type, payload);
    }
}