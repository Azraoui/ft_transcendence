import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()

export class UserService {

    constructor(private prismaService: PrismaService) {}

    async getUserProfile(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        })
        if (user)
        {
            return {
                id: user.id,
                name: user.nickname,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                picture: user.pictureLink,
                bio: user.bio,
                twofactor: user.isTwoFacAuthEnabled
            }
        }
    }


    async setTwoAuthSecret(secret: string, userId: number) {
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                twoFacAuthSecret: secret,
            }
        })
    }


    async turnOnTwoFacAuth(userId: number) {
        return this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                isTwoFacAuthEnabled: true,
            }
        })
    }

    async updateUserProfile(id: number) {

    }

}
