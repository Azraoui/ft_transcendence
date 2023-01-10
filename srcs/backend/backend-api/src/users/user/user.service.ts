import { ForbiddenException, Injectable, UploadedFile } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseStorageProvider } from 'src/utils/firebase-storage.provider';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()

export class UserService {

    constructor(
        private prismaService: PrismaService,
        private storageProvider: FirebaseStorageProvider
    ) { }

    async getUserProfile(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        })
        if (user) {
            return {
                id: user.id,
                nickName: user.nickname,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                picture: user.pictureLink,
                bio: user.bio,
                isTwoFacAuthEnabled: user.isTwoFacAuthEnabled,
                isTwoFacAuthVerified: user.isTwoFacAuthVerified,
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

    async updateProfile(userId: number, { bio, nickname }: { bio: string, nickname: string }) {
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
        if (bio) {
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
        { bio, nickname }: { bio: string, nickname: string }
    ) {
        return await this.updateProfile(userReq.id, { bio, nickname });
    }

    async getAllUsers() {
        let allUsers = [];

        const users = await this.prismaService.user.findMany();
        users.forEach(element => {
            let obj = {
                id: element.id,
                picture: element.pictureLink,
                nickName: element.nickname,
                username: element.username,
                firstName: element.firstName,
                lastName: element.lastName
            }
            allUsers.push(obj);
        });
        return allUsers;
    }

    async addFriend(userId: number, friendId: number) {
        try {
            await this.prismaService.friends.create({
                data: {
                    userId: userId,
                    friendId: friendId
                }
            })
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken');
                }
            }
            throw error
        }
    }

    async update2FAValidationStatus(userId: number, status: boolean = false) {
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                isTwoFacAuthVerified: status,
            }
        })
    }

    async getAllFriends(userId: number) {
        const friends = await this.prismaService.friends.findMany({
            where: {
                OR: [
                    {
                        userId: userId,
                    },
                    {
                        friendId: userId
                    }
                ]
            }
        });
        const allFriend = [];
        for (let i: number= 0; i < friends.length; i++)
        {
            if (friends[i].userId === userId)
            {
                allFriend.push(await this.prismaService.user.findUnique({
                    where: {
                        id: friends[i].friendId
                    }
                }))
            }
            else if (friends[i].friendId === userId) {
                allFriend.push(await this.prismaService.user.findUnique({
                    where: {
                        id: friends[i].userId
                    }
                }))
            }
        }
        return allFriend;
    }

    async getAllUserWithoutFriends(userId: number) {
        console.log(`userId = ${userId}`)
        const notFriends = await this.prismaService.user.findMany({
            where: {
                friends: {
                    
                }
            }
        })
        
        return notFriends;

    }

} // End Of UserServices Class
