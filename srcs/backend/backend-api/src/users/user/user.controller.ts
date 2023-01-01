import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { GetUserReq } from 'src/decorator';
import { UserService } from './user.service';

@Controller('user')

export class UserController {

    constructor (private userService: UserService) {}


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@GetUserReq() userReq) {
        return this.userService.getUserProfile(userReq.id);
    }


}