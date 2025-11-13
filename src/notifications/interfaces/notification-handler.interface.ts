export interface INotificationHandler<T = any> {
    handle(payload: T): Promise<void>;
  }
  