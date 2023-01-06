import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {


    @IsString()
    @IsNotEmpty()
    nickname: string;

    @IsString()
    @IsNotEmpty()
    pictureLink: string;

    @IsString()
    @IsNotEmpty()
    bio: string;

}