import { ForbiddenException, Injectable, UploadedFile } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseStorageProvider } from 'src/utils/firebase-storage.provider';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ChatService } from 'src/chat/chat.service';
import { ChatDto, RoomDto } from 'src/chat/dto';

@Injectable()

export class UserService {

    constructor(
        private prismaService: PrismaService,
        private storageProvider: FirebaseStorageProvider,
        private chatSevice: ChatService,
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
                active: user.active,
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
        try {
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
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken');
                }
            }
            throw error
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
                lastName: element.lastName,
                active: element.active,
            }
            allUsers.push(obj);
        });
        return allUsers;
    }

    async addFriend(userId: number, friendId: number) {
        try {
            if (await this.prismaService.friends.findFirst({
                where: {
                    AND: [
                        {userId: friendId},
                        {friendId: userId}
                    ]
                }
            })) return;
            await this.prismaService.friends.create({
                data: {
                    userId: userId,
                    friendId: friendId
                }
            });
            const roomData: RoomDto = {
                name: `|${userId + friendId}_${friendId + userId}|`,
                type: "private"
            }
            this.chatSevice.createDirectMsgRoom(roomData, userId, friendId);
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
                    },
                    select: {
                        id: true,
                        bio: true,
                        nickname: true,
                        pictureLink: true,
                        active: true,
                    }
                }))
            }
            else if (friends[i].friendId === userId) {
                allFriend.push(await this.prismaService.user.findUnique({
                    where: {
                        id: friends[i].userId
                    },
                    select: {
                        id: true,
                        bio: true,
                        nickname: true,
                        pictureLink: true,
                        active: true,
                    }
                }))
            }
        }
        let allUsers = [];
        for (let i = 0; i  < allFriend.length; i++) {
            let roomName: string = `|${userId + allFriend[i].id}_${userId + allFriend[i].id}|`
            let room = await this.prismaService.room.findUnique({
                where: {
                    name: roomName
                },
                select: {
                    id: true
                }
            })
            let obj = {
                id: allFriend[i].id,
                picture: allFriend[i].pictureLink,
                nickName: allFriend[i].nickname,
                active: allFriend[i].active,
                bio: allFriend[i].bio,
                roomId: room.id
            }
            allUsers.push(obj);
        }
        return allUsers;
    }

    async getAllUserWithoutFriends(userId: number) {
        const noFriends = await this.prismaService.user.findMany({
            where: {
                NOT: {
                    id: userId,
                },
                friends: {
                    none: {
                        friendId: userId
                    }
                },
                friendOf: {
                    none: {
                        userId: userId
                    }
                }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                bio: true,
                nickname: true,
                pictureLink: true,
                username: true,
                active: true,
            },
        });
        let allUsers = [];
        noFriends.forEach(element => {
            let obj = {
                id: element.id,
                picture: element.pictureLink,
                nickName: element.nickname,
                username: element.username,
                firstName: element.firstName,
                lastName: element.lastName,
                active: element.active,
                bio: element.bio,
            }
            allUsers.push(obj);
        });
        return allUsers;
    }

    async updateUserStatus(userId: number, newStatus: string = "off") {
        try {
            const user = await this.prismaService.user.update({
                where: {
                    id: userId
                },
                data: {
                    active: newStatus
                },
                select: {
                    active: true,
                }
            });
            return (user);
        }
        catch (error) {
            throw error;
        }
    }

    async blockFriend(userId: number, friendId: number) {
        if (!friendId) return;
        const friend = await this.prismaService.friends.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            {userId: userId},
                            {friendId: friendId}
                        ]
                    },
                    {
                        AND: [
                            {userId: friendId},
                            {friendId: userId}
                        ]
                    }
                ]
            },
            select: {
                id: true
            }
        })
        if (friend) {
            await this.prismaService.friends.delete({
                where: {
                    id: friend.id
                }
            })
            const roomName: string = `|${userId + friendId}_${userId + friendId}|`
            await this.prismaService.room.delete({
                where: {
                    name: roomName
                }
            })
        }
    }

} // End Of UserServices Class
