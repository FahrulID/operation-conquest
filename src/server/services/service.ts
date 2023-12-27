import { PrismaClient } from '../generated/client'

type json = {
    success: boolean,
    message: string,
    data: any
}

class Service {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async returnError(message: string = "", data: any = null): Promise<json> {
        return {
            success: false,
            message: message,
            data: data
        }
    }

    async returnSuccess(message: string = "", data: any = null): Promise<json> {
        return {
            success: true,
            message: message,
            data: data
        }
    }
}

export default Service;