import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto, RoomDto } from './dto';
import * as argon2 from 'argon2';
import { MAXIMUM_TEST_PHONE_NUMBERS } from 'firebase-admin/lib/auth/auth-config';


@Injectable()
export class ChatService {
    constructor (private prismaService: PrismaService) {}

    async createMsg(msgData: ChatDto, userId: number) {
        const messages = await this.prismaService.messages.create({
            data: {
                senderId: userId,
                text: msgData.text,
                roomId: msgData.roomId
            }
        })
        return messages;
    }

    async findAllMsgs(roomId: number) {
        const messages = await this.prismaService.messages.findMany({
            where: {
                roomId: roomId
            }
        })
        console.log(`messages => ${messages}`);
        return messages;
    }

    async getAllRooms(userId: number) {
        const rooms = await this.prismaService.room.findMany({
            where: {
                OR: [
                    {
                        members: {
                            hasEvery: [userId]
                        }
                    },
                    {
                        OR: [
                            {
                                type: {
                                    equals: "public"
                                }
                            },
                            {
                                type: {
                                    equals: "protected"
                                }
                            }

                        ]
                    }
                ]
            }
        })
        console.log(`rooms => ${rooms}`);
        return rooms;
    }

    async createRoom(userId: number, roomData: RoomDto) {

        let hash: string = "non";
        if (roomData.type == "protected")
            hash = await argon2.hash(roomData.password);

        const newRoom = await this.prismaService.room.create({
            data: {
                name: roomData.name,
                type: roomData.type,
                hash: hash,
                owner: userId,
            }
        })
        if (newRoom) {
            const room = await this.prismaService.room.update({
                where: {
                    id: newRoom.id,
                },
                data: {
                    members: {
                        push: userId
                    }
                }
            })
            return room;
        }
        return newRoom;
    }

    async addAdmin(roomId: number, userId: number, newAdminId: number) {
        const findRoom = await this.prismaService.room.findUnique({
            where: {
                id: roomId,
            },
        })
        if (findRoom) {
            if (findRoom.owner === userId && findRoom.members.find((id) => id === userId)) {
                const room = await this.prismaService.room.update({
                    where: {
                        id: roomId,
                    },
                    data: {
                        admins: {
                            push: newAdminId
                        }
                    }
                })
                return room;
            }
        }
        return findRoom;
    }

    async addMember(roomId: number, userId: number) {
        const findRoom = await this.prismaService.room.findUnique({
            where: {
                id: roomId
            },
        })
        if (findRoom) {
            if (findRoom.members.find((id) => id === userId) == undefined) {
                const room = await this.prismaService.room.update({
                    where: {
                        id: roomId,
                    },
                    data: {
                        admins: {
                            push: userId
                        }
                    }
                })
                return room;
            }
        }
        return findRoom;
    }

    async blockMember(roomId: number, userId: number, memberId: number) {
        const findRoom = await this.prismaService.room.findUnique({
            where: {
                id: roomId
            },
        })
        if (findRoom) {
            if (findRoom.owner === userId || findRoom.admins.find((id) => id === userId))
            {
                const room = await this.prismaService.room.update({
                    where: {
                        id: roomId,
                    },
                    data: {
                        blocked: {
                            push: memberId
                        },
                        members: {
                            set: findRoom.members.filter((id) => id !== memberId)
                        }
                    }
                })
                return room;
            }
        }
        return findRoom;
    }

    async muteMember(roomId: number, userId: number, memberId: number, muteTime) {
        const findRoom = await this.prismaService.room.findUnique({
            where: {
                id: roomId
            },
            include: {
                muteds: true
            }
        })

        if (findRoom) {
            if (findRoom.owner === userId || findRoom.admins.find((id) => id === userId)) {
                const room = await this.prismaService.room.update({
                    where: {
                        id: userId
                    },
                    data: {
                        muteds: {
                            create: [
                                {time: muteTime, userId: memberId},
                            ]
                        }
                    }
                })
                return room;
            }
        }
        return findRoom;
    }

    async leftRoom(roomId: number, userId: number) {
        const room = await this.prismaService.room.findUnique({
            where: {
                id: roomId,
            }
        })
        if (room) {
            if (room.members.find((id) => id === userId))
            {
                await this.prismaService.room.update({
                    where: {
                        id: roomId,
                    },
                    data: {
                        members: {
                            set: room.members.filter((id) => id !== userId)
                        }
                    }
                })
            }
            if (room.admins.find((id) => id === userId))
            {
                await this.prismaService.room.update({
                    where: {
                        id: roomId,
                    },
                    data: {
                        admins: {
                            set: room.members.filter((id) => id !== userId)
                        }
                    }
                })
            }
            if (room.owner == userId)
            {
                await this.prismaService.room.update({
                    where: {
                        id: roomId,
                    },
                    data: {
                        owner: {
                            set: undefined
                        }
                    }
                })
            }
        }
    }

}
