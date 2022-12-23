import { Global, INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    

    // fun1
    async onModuleInit() {
        await this.$connect();
    }

    // fun2
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        })
    }
    
}
