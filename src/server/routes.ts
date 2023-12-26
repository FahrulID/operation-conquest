import * as socketIO from "socket.io";
import fastifysocketIO from "fastify-socket.io";
import { PrismaClient } from './generated/client'

class Routes {
    private io!: socketIO.Server;
    private prisma: PrismaClient;

    constructor(io: socketIO.Server) {
        this.prisma = new PrismaClient();
        this.io = io;
        this.routes();
    }

    routes(): void {
        this.io.on('connect', (socket: socketIO.Socket) => {
            console.info('Socket connected!', socket.id);

            socket.on('disconnect', () => {
                console.info('Socket disconnected!', socket.id);
            });

            socket.on('hello', () => {
                console.info('hello');
            });
        });
    }
}

export default Routes;