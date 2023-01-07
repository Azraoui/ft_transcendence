import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {


    @IsNotEmpty()
    nickname: string;

    @IsNotEmpty()
    bio: string;

}