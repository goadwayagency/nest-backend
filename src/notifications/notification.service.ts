import { Inject, Injectable } from "@nestjs/common";
import * as notificationsRepositoryInterface from "./interfaces/notifications-repository.interface";
import { Notification } from "./notification.entity";

@Injectable()
export class NotificationService {
    constructor(
        @Inject('INotificationsRepository')
        private readonly notificationRepo: notificationsRepositoryInterface.INotificationsRepository,
      ) {}

  async createNotification(userId: string, type: string, payload?: any): Promise<Notification> {
    return this.notificationRepo.createNotification(userId, type, payload);
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notificationRepo.getUserNotifications(userId);
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return this.notificationRepo.markAsRead(notificationId);
  }
}
