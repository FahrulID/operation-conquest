import * as Phaser from 'phaser';
import { ConnectionPlugin } from "../plugins/connection";
import { SocketResponse } from "../../global/types/types";
import { ToastPlugin } from '../plugins/toast';

export default class Auth extends Phaser.Scene {
    connection: ConnectionPlugin;
    toast: ToastPlugin;

    constructor() {
        super({ key: 'auth', active: true });
    }

    preload() {
        this.load.html('login-form', 'assets/html/login.html');
        this.load.html('username-form', 'assets/html/username.html');
    }

    async create() {
        await this.usernameForm();
    }

    loginForm() {
        const loginForm = this.add.dom(400, 300).createFromCache('login-form');
        const t = this;

        loginForm.addListener('click');
        loginForm.on('click', function (event) {
            if (event.target.name === 'loginButton') {
                const username = this.getChildByName('username');
                const password = this.getChildByName('password');

                let response = t.connection.login({ "username": username.value, "password": password.value });
                console.log(response);
            }
        });
    }

    async usernameForm() {
        const t = this;
        const usernameForm = this.add.dom(400, 300).createFromCache('username-form');

        usernameForm.addListener('click');
        usernameForm.on('click', async function (event) {
            if (event.target.name === 'usernameButton') {
                const username = this.getChildByName('username');

                let response: SocketResponse = await t.connection.usernameCheck({ "username": username.value });

                if (response.data != true) {
                    usernameForm.setVisible(false);
                    t.loginForm();
                    t.toast.error(response.message);
                } else {
                    t.toast.success(response.message);
                    usernameForm.setVisible(false);
                }
            }
        });
    }
}