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
                // name: user.nickname,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                picture: user.pictureLink,
                bio: user.bio
            }
        }
    }

    async updateUserProfile(id: number) {

    }

}
