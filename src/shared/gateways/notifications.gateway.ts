import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',  // adjust later for production
    }
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private users: Map<string, string> = new Map(); // userId -> socketId

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: Socket) {
        for (const [userId, socketId] of this.users.entries()) {
            if (socketId === client.id) {
                this.users.delete(userId);
                break;
            }
        }
    }

    @SubscribeMessage('register')
    registerUser(client: Socket, userId: string) {
        this.users.set(userId, client.id);
    }

    sendNotification(userId: string, message: string) {
        const socketId = this.users.get(userId);
        if (!socketId) return;

        this.server.to(socketId).emit('new_notification', { message });
    }
}