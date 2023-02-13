import { IsNotEmpty, IsNumber } from "class-validator"

export class PrivateRoomDto {
    
    @IsNotEmpty()
    @IsNumber()
    id: number
    
    @IsNumber()
    @IsNotEmpty()
    roomId: number
}