import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMsgDto {
    
    @IsString()
    @IsNotEmpty()
    text: string

    @IsNumber()
    @IsNotEmpty()
    roomId: number


    @IsNumber()
    @IsNotEmpty()
    senderId: number
}