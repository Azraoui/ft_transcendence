import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class FortyTwoOAuthGuard extends AuthGuard('42') {
    constructor (private configService: ConfigService) {
        super ({
            accessType: 'offline',
        })
    }
}