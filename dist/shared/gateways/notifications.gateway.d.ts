import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private users;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    registerUser(client: Socket, userId: string): void;
    sendNotification(userId: string, message: string): void;
}
