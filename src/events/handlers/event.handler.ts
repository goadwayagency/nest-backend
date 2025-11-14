export interface EventHandler<T = any> {
    supports(eventType: string): boolean;
    handle(payload: T): Promise<void>;
  }