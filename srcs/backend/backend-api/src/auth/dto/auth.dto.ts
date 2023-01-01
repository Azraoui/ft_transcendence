import { IsEmail, IsString } from "class-validator";

export class AuthDto {


    @IsString()
    nickname?: string;

    @IsString()
    username: string;
    
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    pictureLink: string;

    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;
}