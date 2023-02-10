import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { uniqueNamesGenerator, NumberDictionary } from 'unique-names-generator';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {

}

    public async getUserFromAuthenticationToken(token: string) {
        const payload = await this.jwt.verify(token, {
            secret: this.config.get("JWT_SECRET"),
        })
        if (payload.userId) {
            const user =  await this.prisma.user.findUnique({
                where: {
                    id: payload.userId
                },
                select: {
                    id: true,
                    nickname: true,
                    pictureLink: true,
                    username: true,
                    active: true
                }
            });
            return user;
        }
    }

    async fortytwoLogin(apiData: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: apiData.email
            }
        })
        if (!user)
        {
            try {
                await this.prisma.user.create({
                    data: {
                        nickname: uniqueNamesGenerator({ 
                            dictionaries: [
                                [apiData.username], NumberDictionary.generate({ min: 1, max: 1337 })
                            ],
                            length: 2,
                            separator: '',
                            style: 'capital',
                        }),
                        username: apiData.username,
                        firstName: apiData.firstName,
                        lastName: apiData.lastName,
                        email: apiData.email,
                        pictureLink: apiData.pictureLink,
                        accessToken: apiData.accessToken,
                        refreshToken: apiData.refreshToken,
                        bio: "I am Noob"
                    }
                })
            }
            catch (error) {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException (
                            'Credentials Taken'
                        )
                    }
                }
                throw error
            };
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

    getCookieWithJwtAccessToken(
        userId: number,
        isTwoFacAuth: boolean = false
    ) {
        const payload = {
            userId: userId,
            isTwoFacAuth
        };
        const token = this.jwt.sign(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_EXPIRED_TIME')
        });
        return token;
    }
}
