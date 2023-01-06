import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {


    @IsString()
    @IsNotEmpty()
    nickname: string;

    @IsString()
    @IsNotEmpty()
    bio: string;

}