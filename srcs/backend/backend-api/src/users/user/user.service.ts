import { Injectable, UploadedFile } from '@nestjs/common';
import { FirebaseApp } from 'firebase/app';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as admin from 'firebase-admin';
import { FirebaseStorageProvider } from 'src/utils/firebase-storage.provider';

@Injectable()

export class UserService {

    constructor(
        private prismaService: PrismaService,
        private storageProvider: FirebaseStorageProvider
    ) {}

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
                nickname: user.nickname,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                picture: user.pictureLink,
                bio: user.bio,
                twofactor: user.isTwoFacAuthEnabled,
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

    async turnOnTwoFacAuth(userId: number, status: boolean = false) {
        return this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                isTwoFacAuthEnabled: status,
            }
        })
    }

    async updateUserProfile(userId: number, newData: UserDto) {
        await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                nickname: newData.nickname,
                pictureLink: newData.pictureLink,
                bio: newData.bio,
            }
        })
    }


    async uploadAndGetUrl(@UploadedFile() file) {
        const filePath = await this.storageProvider.upload(file, 'ael-azra', "11");
        console.log(filePath);
        return filePath;
    }

}
