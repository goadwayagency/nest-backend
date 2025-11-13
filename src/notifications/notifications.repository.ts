import { Injectable } from '@nestjs/common';
import { prisma } from './../lib/prisma';
import { Notification } from './notification.entity';
import { INotificationsRepository } from './interfaces/notifications-repository.interface';

@Injectable()
export class NotificationsRepository implements INotificationsRepository {
  async createNotification(userId: string, type: string, payload?: any): Promise<Notification> {
    return prisma.notification.create({
      data: { userId, type, payload },
    });
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }
}
