import { IsNotEmpty, IsString } from "class-validator";

export class RoomDto {
    
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    password?: string

}