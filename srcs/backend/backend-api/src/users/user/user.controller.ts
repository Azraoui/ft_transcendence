import { Body, Controller, Get, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guard/jwt-two-factor.guard';
import { Express } from 'express'
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Response } from 'express';
import { GetUserReq } from 'src/decorator';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')

export class UserController {

    constructor (private userService: UserService) {}

    @UseGuards(JwtTwoFactorGuard)
    @Get('profile')
    getProfile(@GetUserReq() userReq) {
        return this.userService.getUserProfile(userReq.id);
    }
    
    
    @UseGuards(JwtTwoFactorGuard)
    @Put('updateProfile')
    @UseInterceptors(FileInterceptor('file'))
    updateUserProfile (
        // @GetUserReq() userReq,
        // @Body() {bio, nickname, pictureLink}/*: UserDto*/,
        @UploadedFile() file: Express.Multer.File
    ) {
        // console.log(file);
        this.userService.uploadAndGetUrl(file);
    }


}