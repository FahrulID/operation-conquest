import { ConnectionPlugin } from "./connection";

var Plugins = {
    global: [
        {
            key: 'ConnectionPlugin',
            plugin: ConnectionPlugin,
            start: true,
        }
    ]
}

export default Plugins;