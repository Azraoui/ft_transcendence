import { IsNotEmpty, IsNumber } from "class-validator"

export class BlockDto {
    
    @IsNumber()
    @IsNotEmpty()
    roomId: number

    @IsNumber()
    @IsNotEmpty()
    memberId: number
}