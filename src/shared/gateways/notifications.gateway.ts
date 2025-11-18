import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',  // adjust later for production
        pingInterval: 10000, // send ping every 10s
        pingTimeout: 5000,   // disconnect if no pong after 5s
    }
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private users: Map<string, string> = new Map(); // userId -> socketId

    handleConnection(client: Socket) {
        // console.log('Client connected:', client.id);
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
    registerUser(
        @ConnectedSocket() client: Socket,
        @MessageBody() userId: string,
    ) {
        this.users.set(userId, client.id);
    }

    sendNotification(userId: string, data: {
        id: string;
        usuario_id: string;
        mensagem: string;
        goTo: string | null;
        created_at: Date;
    }) {
        const socketId = this.users.get(userId);
        if (!socketId) return;

        this.server.to(socketId).emit('new_notification', { data });
    }
}