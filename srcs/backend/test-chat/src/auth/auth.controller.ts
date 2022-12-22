import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('chat')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Get()
    msg(): string {
        return this.authService.getWelcome();
    }
} 