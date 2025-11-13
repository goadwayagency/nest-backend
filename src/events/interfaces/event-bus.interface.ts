import { IEvent } from "./event.interface";

export interface IEventBus {
    emit<T>(event: IEvent<T>): Promise<void>;
    subscribe<T>(eventType: string, handler: (payload: T) => Promise<void>): void;
}