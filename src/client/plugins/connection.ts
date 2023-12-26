import { Plugins } from "phaser";
const { BasePlugin } = Plugins;
import { io, Socket } from "./socket.io/socket.io.esm.min.js"

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
    connect: () => void;
}

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
        });
    }

    stop() {
        this.io.disconnect();
    }

    on(eventName, callback) {
        this.io.on(eventName, callback);
    }
}