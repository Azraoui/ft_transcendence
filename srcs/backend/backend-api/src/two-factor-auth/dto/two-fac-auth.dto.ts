import { IsString } from "class-validator";

export class twoFactorAuthenticationDto {
    @IsString()
    twoFactorAuthenticationCode: string;
}