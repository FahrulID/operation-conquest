import { ConnectionPlugin } from "./connection";
import { ToastPlugin } from "./toast";

var Plugins = {
    global: [
        {
            key: 'ConnectionPlugin',
            plugin: ConnectionPlugin,
            start: true,
            mapping: 'connection'
        },
        {
            key: 'ToastPlugin',
            plugin: ToastPlugin,
            start: true,
            mapping: 'toast'
        }
    ]
}

export default Plugins;