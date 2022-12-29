import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {

    }

    async fortytwoLogin(apiData: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: apiData.email
            }
        })
        if (!user)
        {
            const user = await this.prisma.user.create({
                data: {
                    username: apiData.username,
                    firstName: apiData.firstName,
                    lastName: apiData.lastName,
                    email: apiData.email,
                    pictureLink: apiData.pictureLink,
                    accessToken: apiData.accessToken,
                    refreshToken: apiData.refreshToken,
                }
            })
        }
        else
        {
            return user;
        }
    }

    signToken(userId: number, username: string) {
        const payloud = {
            sub: userId,
            username
        }

        const secret = this.config.get("JWT_SECRET");
        const expriedTime = this.config.get('JWT_EXPIRED_TIME');

        return this.jwt.signAsync(payloud, {
            expiresIn: expriedTime,
            secret: secret,
        })
    }

}
