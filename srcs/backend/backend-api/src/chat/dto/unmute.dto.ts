import { IsNotEmpty, IsNumber } from "class-validator";

export class UnMuteDto {

    @IsNumber()
    @IsNotEmpty()
    roomId: number

    @IsNumber()
    @IsNotEmpty()
    memberId: number
}