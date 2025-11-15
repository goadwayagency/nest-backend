import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) { }

  // --------------------------
  // JOIN PRODUCT ROOM
  // --------------------------
  @SubscribeMessage('joinProduct')
  handleJoinProduct(
    @MessageBody() { productId }: { productId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('User joined room:', productId);
    client.join(productId);

    return { status: 'joined', productId };
  }

  // --------------------------
  // SEND MESSAGE
  // --------------------------
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    data: { productId: string; fromUserId: string; toUserId: string; message: string },
  ) {
    const savedMessage = await this.chatService.saveMessage(data);

    console.log('New message saved:', savedMessage);

    // MUST MATCH FRONTEND: socket.on("newMessage")
    this.server.to(data.productId).emit('newMessage', savedMessage);

    return savedMessage;
  }

  // --------------------------
  // PLACE BID
  // --------------------------
  @SubscribeMessage('placeBid')
  async handlePlaceBid(
    @MessageBody() data: { productId: string; buyerId: string; amount: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const result = await this.chatService.placeBid(data);

      this.server.to(data.productId).emit('newBid', result);
      return result;

    } catch (err) {
      console.error('Bid error:', err);

      client.emit('bidError', {
        message: err.message || 'Unknown error',
        code: err.getStatus?.() || 500,
      });

      return;
    }
  }

  // --------------------------
  // COUNTER BID
  // --------------------------
  @SubscribeMessage('counterBid')
  async handleCounterBid(
    @MessageBody() data: { bidId: string; newAmount: number; productId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const result = await this.chatService.counterBid(data);
      this.server.to(data.productId).emit('newBid', result);
      return result;
    } catch (err) {
      console.error('Counter bid error:', err);
      client.emit('bidError', { message: err.message || 'Unknown error' });
    }
  }

  // --------------------------
  // ACCEPT BID
  // --------------------------
  @SubscribeMessage('acceptBid')
  async handleAcceptBid(
    @MessageBody() data: { bidId: string; productId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const bid = await this.chatService.acceptBid(data.bidId);
      this.server.to(data.productId).emit('bidAccepted', bid);
      return bid;
    } catch (err) {
      console.error('Accept bid error:', err);
      client.emit('bidError', { message: err.message || 'Unknown error' });
    }
  }

  // --------------------------
  // DECLINE BID
  // --------------------------
  @SubscribeMessage('declineBid')
  async handleDeclineBid(
    @MessageBody() data: { bidId: string; productId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const bid = await this.chatService.declineBid(data.bidId);
      this.server.to(data.productId).emit('bidDeclined', bid);
      return bid;
    } catch (err) {
      console.error('Decline bid error:', err);
      client.emit('bidError', { message: err.message || 'Unknown error' });
    }
  }

}
