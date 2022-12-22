import { HttpCode } from "@nestjs/common"
import { IsNotEmpty, Length } from "class-validator"

export class CreateAuth {
    
    @IsNotEmpty( {message: 'The request should have a name'})
    @Length(3, 255)
    name: string

    @IsNotEmpty( {message: 'The request should have a msg'})
    @Length(3, 255)
    msg: string
}