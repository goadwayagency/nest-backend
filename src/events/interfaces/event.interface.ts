export interface IEvent<T = any> {
    type: string;
    payload: T;
  }
  