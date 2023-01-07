import { Body, Controller, Get, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guard/jwt-two-factor.guard';
import { Express } from 'express'
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Response } from 'express';
import { GetUserReq } from 'src/decorator';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')

export class UserController {

    constructor (
        private userService: UserService,
        private prismaService: PrismaService
        ) {}

    @UseGuards(JwtTwoFactorGuard)
    @Get('profile')
    getProfile(@GetUserReq() userReq) {
        return this.userService.getUserProfile(userReq.id);
    }
    
    
    
    @UseGuards(JwtTwoFactorGuard)
    @Put('updatePicture')
    @UseInterceptors(FileInterceptor('file'))
    async updatePicture (
        @GetUserReq() userReq,
        @UploadedFile() file: Express.Multer.File
    ) {
        return await this.userService.updateImgUrl(userReq, file);
    }
    
    @UseGuards(JwtTwoFactorGuard)
    @Put('updateUserInfo')
    async updateUserInfo (
        @GetUserReq() userReq,
        @Body() {bio, nickname}: {bio:string, nickname:string}
    ) {
        return await this.userService.updateUserInfo(userReq, {bio, nickname});
    }


}