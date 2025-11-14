// import { IEventBus } from "./interfaces/event-bus.interface";

// type Handler<T = any> = (payload: T) => Promise<void>;

// export class InMemoryEventBus implements IEventBus {
//   private handlers: Record<string, Handler[]> = {};

//   async emit<T>(event: IEvent<T>) {
//     const handlers = this.handlers[event.type] || [];
//     for (const handler of handlers) {
//       await handler(event.payload);
//     }
//   }

//   subscribe<T>(eventType: string, handler: Handler<T>) {
//     if (!this.handlers[eventType]) this.handlers[eventType] = [];
//     this.handlers[eventType].push(handler);
//   }
// }
