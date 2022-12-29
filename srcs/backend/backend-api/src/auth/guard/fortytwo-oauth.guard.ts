import { ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class FortyTwoOAuthGuard extends AuthGuard('42') {
    constructor (private configService: ConfigService) {
        super ({
            accessType: 'offline',
        })
    }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const activate = (await super.canActivate(context)) as boolean;
    //     const request = context.switchToHttp().getRequest();
    //     await super.logIn(request);

    //     return activate;
    // }
}