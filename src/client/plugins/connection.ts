import { Plugins } from "phaser";
const { BasePlugin } = Plugins;
import { io, Socket } from "./socket.io/socket.io.esm.min.js"
import { ClientToServerEvents, ServerToClientEvents } from "../../global/interfaces/connection.interface";

const serverURL = "http://localhost:3000";

export class ConnectionPlugin extends BasePlugin {
    private io: Socket<ServerToClientEvents, ClientToServerEvents>;

    constructor(pluginManager) {
        super(pluginManager);
    }

    init() {
        this.io = io(serverURL, { reconnection: true });

        this.on('connect', () => {
            console.log('connected');

            this.io.emit('login', { "username": "test", "password": "test" });
        });
    }

    stop() {
        this.io.disconnect();
    }

    on(eventName, callback) {
        this.io.on(eventName, callback);
    }
}