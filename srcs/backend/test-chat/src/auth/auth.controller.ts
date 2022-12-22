import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('chat')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Get('/')
    getMsg(): string {
        return this.authService.getWelcome();
    }
    
    @Get('/users')
    getMsgToUsers(): string {
        return this.authService.getWelcomeToUsers();
    }


    @Post('/')
    /** 
     * i can use @HttpCode(200) to change status code from 201 to 200
    */
    // @HttpCode(200)
    createMsg(@Body() chatData): any {
        return {from: 'abdellah', data: chatData}
    }
}  