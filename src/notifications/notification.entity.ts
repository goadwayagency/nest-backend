export class Notification {
    id: string;
    userId: string;
    type: string;
    payload?: any;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
  }