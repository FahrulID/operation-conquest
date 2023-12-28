import { Plugins } from "phaser";
const { BasePlugin } = Plugins;
import { io, Socket } from "./socket.io/socket.io.esm.min.js"
import { ClientToServerEvents, ServerToClientEvents } from "../../global/interfaces/connection.interface";
import { authentication, usernameCheck, SocketResponse } from "../../global/types/types"

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

    public async login(data: authentication): Promise<SocketResponse> {
        const promise = new Promise((resolve, reject) => {
            this.io.emit('login', { "username": data.username, "password": data.password }, function (r: SocketResponse) {
                resolve(r);
            });
        })
        return promise.then((r: SocketResponse) => {
            return r;
        });
    }

    public async usernameCheck(data: usernameCheck): Promise<SocketResponse> {
        const promise = new Promise((resolve, reject) => {
            this.io.emit('usernameCheck', { "username": data.username }, function (r: SocketResponse) {
                resolve(r);
            });
        })
        return promise.then((r: SocketResponse) => {
            return r;
        });
    }

    public stop() {
        this.io.disconnect();
    }

    on(eventName, callback) {
        this.io.on(eventName, callback);
    }
}