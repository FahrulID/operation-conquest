import fastify, { FastifyReply, FastifyRequest } from "fastify";
import * as socketIO from "socket.io";
import fastifysocketIO from "fastify-socket.io";

class App {
    private server: any;
    private port: number;
    private io!: socketIO.Server;

    constructor(port: number) {
        this.port = port;
        this.server = fastify({
            logger: true
        });
        this.server.register(fastifysocketIO, ({
            cors: { origin: "*" }
        }));

        this.server.get("/", (request: FastifyRequest, reply: FastifyReply) => {
            this.server.io.emit("hello");
        });

        this.server.ready((err: any) => {
            if (err) { throw err }
            this.io = this.server.io;

            this.io.on('connect', (socket: socketIO.Socket) => {
                return console.info('Socket connected!', socket.id);
            })
        });
    }

    public Start() {
        this.server.listen(this.port, (err: any, address: string) => {
            if (err) {
                this.server.log.error(err);
                process.exit(1);
            }
            this.server.log.info(`server listening on ${address}`);
        });
    }
}

const app = new App(3000);
app.Start(); // Start the server