import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserReq = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        if (data) {
            return req.user[data];
        }
        return req.user;
    }
)