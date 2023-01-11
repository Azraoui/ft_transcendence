import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Res } from "@nestjs/common";
import { Response } from "express";
import { join } from "path";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        // const status = exception.getStatus()
        response.redirect(301, process.env.HOST_MACHINE_URL + ':5173');
    }
}