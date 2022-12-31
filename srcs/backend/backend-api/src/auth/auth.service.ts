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
            await this.prisma.user.create({
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
    }

    async signToken(userId: number, username: string) {
        const payloud = {
            sub: userId,
            username
        }

        const secret = this.config.get("JWT_SECRET");
        const expriedTime = this.config.get('JWT_EXPIRED_TIME');

        const token = await this.jwt.signAsync(payloud, {
            expiresIn: expriedTime,
            secret: secret,
        })
        console.log(`token = ${token}`);
        return token;
    }

    async getUser(id: number | undefined, email?: string | undefined) {
        if (id != undefined)
        {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            })
            return user;
        }
        else if (email != undefined) {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            return user;
        }
        return undefined;
    }

}
