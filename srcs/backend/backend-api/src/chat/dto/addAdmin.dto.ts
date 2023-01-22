import { IsNotEmpty, IsNumber } from "class-validator"

export class AddAdminDto {
    
    @IsNumber()
    @IsNotEmpty()
    roomId: number
    
    @IsNumber()
    @IsNotEmpty()
    memberId: number

}