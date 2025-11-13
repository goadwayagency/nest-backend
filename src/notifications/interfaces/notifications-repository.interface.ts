import { Notification } from '../notification.entity';

export interface INotificationsRepository {
  createNotification(userId: string, type: string, payload?: any): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  markAsRead(notificationId: string): Promise<Notification>;
}