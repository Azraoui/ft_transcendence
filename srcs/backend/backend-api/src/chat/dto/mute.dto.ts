import { IsNotEmpty, IsNumber } from "class-validator"

export class MuteDto {
    
    @IsNumber()
    @IsNotEmpty()
    roomId: number
    
    @IsNumber()
    @IsNotEmpty()
    memberId: number

    @IsNumber()
    @IsNotEmpty()
    duration: number
}