export interface ChannelHandler<T = any> {
  readonly channelName: string;
  send(payload: T, eventType?: string): Promise<void>;
}
