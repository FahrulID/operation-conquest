import * as socketIO from "socket.io";
import fastifysocketIO from "fastify-socket.io";
import AuthService from "./services/auth";
import { authentication, usernameCheck } from "../global/types/types";

class Routes {
    private io!: socketIO.Server;
    private authService: AuthService = new AuthService();

    constructor(io: socketIO.Server) {
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

            socket.on('login', async (data: authentication | usernameCheck) => {
                // check username
                let response = await this.authService.checkUsername(data);

                console.log(response);
            });
        });
    }
}

export default Routes;