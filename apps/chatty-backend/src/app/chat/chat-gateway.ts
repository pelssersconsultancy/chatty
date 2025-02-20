import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, {}) // set cors options in this object
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleDisconnect(client: Socket) {
    // nestjs analog to io.on('disconnect)
    console.log(`Client disconnected: ${client.id}`);

    // we notify all users that a new user has disconnected
    this.server.emit(
      'user-left',
      `User ${client.id} has left
          the chat`
    );
  }

  handleConnection(client: Socket, ...args: any[]) {
    // nestjs analog to io.on('connect)
    console.log(`Client connected: ${client.id} with args ${args}`);

    // we notify all users that a new user has joined
    this.server.emit(
      'user-joined',
      `User ${client.id} has joined
    the chat`
    );
  }

  @SubscribeMessage('newMessage')
  // nestjs analog to socket.on()
  handleMessage(client: Socket, message: any): void {
    console.log(
      `Message received from client ${client.id} with message ${message}`
    );

    // emit a message to the sender
    client.emit(
      'replyMessage',
      `This is a reply message for client ${client.id}`
    );

    // broadcast a message to all connected clients
    this.server.emit('replyMessage', 'broadcasting to all clients');
  }
}
