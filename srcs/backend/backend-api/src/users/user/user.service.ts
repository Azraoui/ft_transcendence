import { Injectable, UploadedFile } from '@nestjs/common';
import { FirebaseApp } from 'firebase/app';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as admin from 'firebase-admin';
import { FirebaseStorageProvider } from 'src/utils/firebase-storage.provider';
import { User } from '@prisma/client';

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
                nickName: user.nickname,
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

    async updateProfile(userId: number, {bio, nickname}: {bio:string, nickname: string}) {
            if (nickname) {
            await this.prismaService.user.update({
                where: {
                    id: userId,
                },
                data: {
                    nickname: nickname,
                }
            })
        }
        if (bio)
        {
            await this.prismaService.user.update({
                where: {
                    id: userId,
                },
                data: {
                    bio: bio,
                }
            })
        }
    }


    async uploadAndGetUrl(@UploadedFile() file, username: string, id: string) {
        return await this.storageProvider.upload(file, username, id);
    }

        async updateImgUrl(
        userReq: User,
        file: Express.Multer.File
        ) {
            if (file) {
                const user = await this.getUserProfile(userReq.id);
                const pictureLink = await this.uploadAndGetUrl(file, user.username, user.id.toString());
                await this.prismaService.user.update({
                    where: {
                        id: userReq.id,
                    },
                    data: {
                        pictureLink: pictureLink,
                    }
                })
            }
        }

        async updateUserInfo(
        userReq: User,
        {bio, nickname}: {bio:string, nickname:string}
        ) {
            return await this.updateProfile(userReq.id, {bio, nickname});
        }
}
