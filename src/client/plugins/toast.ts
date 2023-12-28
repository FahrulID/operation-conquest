import { Plugins } from "phaser";
const { BasePlugin } = Plugins;

export class ToastPlugin extends BasePlugin {
    public toast: any;

    constructor(pluginManager) {
        super(pluginManager);
    }

    init() {
        this.toast = (<any>window).toast;
    }

    error(message: string) {
        this.toast.error({ title: 'Error', msg: message });
    }

    success(message: string) {
        this.toast.success({ title: 'Success', msg: message });
    }

    info(message: string) {
        this.toast.info({ title: 'Info', msg: message });
    }
}