import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';

let num = 0;

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {}

  // 连接
  handleConnection(client: Client) {
    console.log('有人进入房间', client.id);
  }

  // 断开连接
  handleDisconnect(client: Client) {
    console.log('有人离开房间', client.id);
  }

  @SubscribeMessage('event')
  onEvent(client: Client, payload) {
    console.log('有消息', client.id, payload);
    this.server.emit('event', payload); // 在当前命名空间下广播事件
  }
}
