export interface IEventBus {
  emit(event: { type: string; payload: any }): Promise<void>;
  }