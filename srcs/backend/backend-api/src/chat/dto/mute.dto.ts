import { IsNotEmpty, IsNumber } from "class-validator"

export class MuteDto {
    
    @IsNumber()
    @IsNotEmpty()
    roomId: number
    
    @IsNumber()
    @IsNotEmpty()
    muterId: number

    @IsNumber()
    @IsNotEmpty()
    duration: number
}