import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class JoinRoomDto {
    
    @IsNumber()
    @IsNotEmpty()
    roomId: number

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    password?: string

}