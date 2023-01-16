import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChatDto {

    @IsNotEmpty()
    @IsString()
    text: string

    @IsNumber()
    @IsNotEmpty()
    roomId: number

}