import Service from "./service";
import * as argon2 from "argon2";
import { authentication, usernameCheck } from "../../global/types/types";
class AuthService extends Service {
    constructor() {
        super();
    }

    async checkUsername(data: usernameCheck) {
        const user = await this.prisma.user.findFirst({ where: { username: data.username } });

        if (!user) {
            return await this.returnSuccess("Username is available", true);
        }

        return await this.returnError("Username is not available", false);
    }

    async login(data: authentication) {
        const user = await this.prisma.user.findFirst({ where: { username: data.username } });

        if (!user) {
            return await this.returnError("Username or password is incorrect", false);
        }

        const valid = await argon2.verify(user.password, data.password);

        if (!valid) {
            return await this.returnError("Username or password is incorrect", false);
        }

        return await this.returnSuccess("Login successful", true);
    }

    async register(data: authentication) {
        const user = await this.prisma.user.findFirst({ where: { username: data.username } });

        if (user) {
            return await this.returnError("Username is not available", false);
        }

        const hashedPassword = await argon2.hash(data.password);

        await this.prisma.user.create({
            data: {
                username: data.username,
                password: hashedPassword
            }
        });

        return await this.returnSuccess("User created successfully", true);
    }
}

export default AuthService;