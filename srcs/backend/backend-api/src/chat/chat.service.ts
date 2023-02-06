import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatDto, JoinRoomDto, RoomDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as moment from 'moment';
import { Room } from '@prisma/client';
import { Socket } from 'socket.io'
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ChatService {
	constructor(
		private prismaService: PrismaService,
		private authService: AuthService
	) { }

	// Authenticating users
	getUserFromSocket(socket: Socket) {
		const jwtToken = socket.handshake.auth.token;
		if (jwtToken) {
			return this.authService.getUserFromAuthenticationToken(jwtToken);
		}
	}

	async createMsg(msgData: ChatDto, userId: number) {
		try {
			const messages = await this.prismaService.messages.create({
				data: {
					senderId: userId,
					text: msgData.text,
					roomId: msgData.roomId
				}
			})
			return messages;
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

	async findAllMsgs(roomId: number, userId: number) {
		const messages = await this.prismaService.messages.findMany({
			where: {
				roomId: roomId
			},
		})
		// let 
		return messages;
	}

	async getPictureLink(memberId: number) {
		const imgUrl = await this.prismaService.user.findUnique({
			where: {
				id: memberId
			},
			select: {
				pictureLink: true
			}
		})
		return imgUrl.pictureLink;
	}

	async getAllRooms(userId: number) {
		const rooms = await this.prismaService.room.findMany({
			where: {
				OR: [
					{
						AND: [
							{
								members: {
									hasEvery: [userId]
								}
							},
							{
								NOT: {
									owner: {
										equals: null,
									}
								}
							}
						]
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
			},
			select: {
				id: true,
				name: true,
				type: true,
				members: true
			}
		})
		// return rooms;
		let roomDataArr = []
		let roomData: Record<string, any> = {};
		let images = []
		for (let i = 0; i < rooms.length; i++) {
			for (let j = 0; j < 5 && j < rooms[i].members.length; j++) {
				images[j] = (await this.getPictureLink(rooms[i].members[j])).toString();
			}
			roomData.id = rooms[i].id;
			roomData.name = rooms[i].name;
			roomData.type = rooms[i].type;
			roomData.images = images;
			roomDataArr.push(roomData)
			images = [];
			roomData = {};
		}
		return roomDataArr;
	}

	async createRoom(userId: number, roomData: RoomDto) {

		let hash: string = "non";
		if (roomData.type == "protected")
			hash = await argon2.hash(roomData.password);

		try {
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
		catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials Taken');
				}
			}
			throw error
		}
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
					},
				})
				return room;
			}
			else if (findRoom.admins.find((id) => id === userId) && findRoom.members.find((id) => id === userId)) {
				const room = await this.prismaService.room.update({
					where: {
						id: roomId,
					},
					data: {
						admins: {
							push: newAdminId
						}
					},
				})
				return room;
			}
		}
		return findRoom;
	}

	async joinRoom(body: JoinRoomDto, userId: number) {
		const findRoom = await this.prismaService.room.findUnique({
			where: {
				id: body.roomId
			},
		})
		if (findRoom.blocked.find((id) => id === userId))
			throw new UnauthorizedException();
		if (body.type === "protected") {
			try {
				if (await argon2.verify(findRoom.hash, body.password)) {
					// password match
					if (findRoom) {
						if (findRoom.members.find((id) => id === userId) === undefined) {
							const room = await this.prismaService.room.update({
								where: {
									id: body.roomId,
								},
								data: {
									members: {
										push: userId
									}
								}
							})
							return room;
						}
					}
					return findRoom;
				} else {
					throw new UnauthorizedException("Wrong Password")
				}
			} catch (err) {
				// internal failure
				throw err
			}
		}
		else {
			if (findRoom) {
				if (findRoom.members.find((id) => id === userId) === undefined) {
					const room = await this.prismaService.room.update({
						where: {
							id: body.roomId,
						},
						data: {
							members: {
								push: userId
							}
						}
					})
					return room;
				}
			}
			return findRoom;
		}
	}

	async blockMember(roomId: number, userId: number, memberId: number) {
		const findRoom = await this.prismaService.room.findUnique({
			where: {
				id: roomId
			},
		})
		if (findRoom) {
			if (findRoom.owner === userId && userId !== memberId) {
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
			else if (findRoom.admins.find((id) => id === userId) && memberId !== findRoom.owner && !findRoom.admins.find((id) => id === memberId)) {
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
			else
				throw new UnauthorizedException(`You don't have the permission to block this user`);
		}
		return findRoom;
	}

	async muteMember(roomId: number, userId: number, memberId: number, muteTime: number) {
		const time = moment().add(muteTime, "m").format('YYYY-MM-DD hh:mm:ss');
		const findRoom = await this.prismaService.room.findUnique({
			where: {
				id: roomId
			},
			include: {
				muteds: true
			}
		})

		if (findRoom.muteds.find((n) => n.userId === userId)) {
			if (time >= findRoom.muteds.find((n) => n.userId === userId).time) {
				await this.prismaService.room.update({
					where: {
						id: roomId,
					},
					data: {
						muteds: {
							set: findRoom.muteds.filter((n) => n.userId !== memberId)
						}
					}
				})
			}
		}


		if (findRoom) {
			if (findRoom.owner === userId || findRoom.admins.find((id) => id === userId)) {
				const room = await this.prismaService.room.update({
					where: {
						id: roomId
					},
					data: {
						muteds: {
							create: [
								{ time: time, userId: memberId },
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
			if (room.members.find((id) => id === userId)) {
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
			if (room.admins.find((id) => id === userId)) {
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
			if (room.owner === userId) {
				await this.prismaService.room.update({
					where: {
						id: roomId,
					},
					data: {
						owner: {
							set: null
						}
					}
				})
			}
			if (room.members.length === 1) {
				await this.prismaService.room.delete({
					where: {
						id: roomId
					}
				})
			}
		}
	}

	// this method for validate send messages permission
	async validatePermission(userId: number, roomId: number) {
		const room = await this.prismaService.room.findUnique({
			where: {
				id: roomId
			},
			include: {
				muteds: true
			}
		})
		if (room) {
			if (room.members.find((id) => id === userId)) {
				if (room.blocked.find((id) => id === userId)) {
					return false;
				}
				const mutedUser = room.muteds.find((userId) => userId === userId)
				if (mutedUser) {
					const time = moment().format('YYYY-MM-DD hh:mm:ss');
					if (time >= mutedUser.time) {
						await this.prismaService.mutedUser.delete({
							where: {
								id: userId,
							}
						})
						return true;
					}
					else
						return false;
				}
			}
			throw new UnauthorizedException(
				`You don't have right to send message in this channel`
			)
		}
		throw new NotFoundException(
			`Can't find Room with this id:${roomId}`
		);
	}

	async getRoomData(roomId: number, userId: number) {
		if (!roomId)
			return;
		const room = await this.prismaService.room.findUnique({
			where: {
				id: roomId
			},
			include: {
				messages: true
			}
		})
		if (!room.members.find((id) => id === userId) || room.blocked.find((id) => id === userId))
			throw new UnauthorizedException("You don't have the access");
		const messages = room.messages;
		let allMessages = [];
		for (let i = 0; i < messages.length; i++) {
			const user = await this.prismaService.user.findUnique({
				where: { id: messages[i].senderId },
				select: {
					nickname: true,
					pictureLink: true,
				}
			})
			let side;
			if (userId === messages[i].senderId)
				side = "left"
			else
				side = "right"
			let obj = {
				senderId: messages[i].senderId,
				senderImage: user.pictureLink,
				nickName: user.nickname,
				text: messages[i].text,
				side: side,
				messageId: messages[i].id,
			}
			allMessages.push(obj);
		}
		return allMessages;
		// return {
		//     isMuted: await this.findMutedStatus(userId, roomId).valueOf(),
		//     duration: await this.getRestTime(userId, roomId).valueOf(),
		//     allMessages: allMessages
		// }
	}

	findUserStatusInRoom(userId: number, room: Room): string {

		if (room?.owner === userId)
			return "owner";
		else if (room?.admins?.find((id) => id === userId))
			return "admin";
		else if (room?.blocked?.find((id) => id === userId))
			return "blocked";
		else if (room?.members?.find((id) => id === userId))
			return "member";
		else
			return "notFound";
	}

	async findMutedStatus(userId: number, roomId: number): Promise<boolean> {
		const mutedUser = await this.prismaService.room.findUnique({
			where: {
				id: roomId
			},
			select: {
				muteds: true
			}
		})
		if (mutedUser.muteds.find((n) => n.userId === userId)) {
			const time = moment().format('YYYY-MM-DD hh:mm:ss');
			if (mutedUser.muteds.find((n) => n.userId === userId).time != null
				&& mutedUser.muteds.find((n) => n.userId === userId).time <= time) {
				return false
			}
			return true;
		}
		return false;
	}

	async getRestTime(userId: number, roomId: number) {
		const mutedUser = await this.prismaService.mutedUser.findMany({
			where: {
				userId: userId,
				roomId: roomId
			}
		})
		if (mutedUser) {
			const time = moment().format('YYYY-MM-DD hh:mm:ss');
			for (let i = 0; i < mutedUser.length; i++) {
				if (mutedUser[i].time < time) {
					await this.prismaService.mutedUser.delete({
						where: {
							id: mutedUser[i].id
						}
					})
					return "0"
				}
				return mutedUser[i].time;
			}
		}
		return "0";
	}

	async getRoom(roomId: number) {
		const room = await this.prismaService.room.findUnique({
			where: {
				id: roomId,
			}
		});
		return room;
	}

	async viewMembers(roomId: number, userId: number) {
		const room = await this.prismaService.room.findUnique({
			where: {
				id: roomId,
			}
		})
		if (room) {
			if (!room.members.find((id) => id === userId) || room.blocked.find((id) => id === userId))
				throw new UnauthorizedException("You Can't View This Room Members For Some Reason");
			else {
				const membersData: Record<string, any> = {};
				membersData.userRole = this.findUserStatusInRoom(userId, room);
				let members = []
				for (let i = 0; i < room.members.length; i++) {
					const user = await this.prismaService.user.findUnique({
						where: {
							id: room.members[i]
						},
						select: {
							pictureLink: true,
							nickname: true,
							id: true,
							active: true,
						}
					})
					const userData: Record<string, any> = {};
					userData.id = user.id;
					userData.pictureLink = user.pictureLink,
						userData.active = user.active,
						userData.nickName = user.nickname,
						userData.role = this.findUserStatusInRoom(user.id, room);
					userData.isMuted = await this.findMutedStatus(user.id, roomId).valueOf();
					members.push(userData);
				}
				membersData.members = members;
				return membersData;
			}
		}
	}

	async unMuteMember(roomId: number, userId: number, memberId: number) {
		const room = await this.prismaService.room.findUnique({
			where: {
				id: roomId
			},
			include: {
				muteds: true
			}
		})
		if (room.owner === userId) {
			await this.prismaService.mutedUser.delete({
				where: {
					id: room.muteds.find((n) => n.userId === memberId).id,
				},
			})
		}
		else if (room.admins.find((id) => id === userId)
			&& !room.admins.find((id) => id === memberId) && memberId != room.owner) {
			await this.prismaService.mutedUser.delete({
				where: {
					id: room.muteds.find((n) => n.userId === memberId).id,
				},
			})
		}
	}

	async getDirectMsgs(userId: number, roomId: number) {
		if (!roomId)
			return;
		// const roomName: string = `|${userId + friendId}_${friendId + userId}|`
		const room = await this.prismaService.room.findUnique({
			where: {
				id: roomId
			},
			include: {
				messages: true
			}
		})
		if (!room) return;
		const messages = room.messages;
		let allMessages = [];
		for (let i = 0; i < messages.length; i++) {
			const user = await this.prismaService.user.findUnique({
				where: { id: messages[i].senderId },
				select: {
					nickname: true,
					pictureLink: true,
				}
			})
			let side;
			if (userId === messages[i].senderId)
				side = "left"
			else
				side = "right"
			let obj = {
				senderId: messages[i].senderId,
				senderImage: user.pictureLink,
				nickName: user.nickname,
				text: messages[i].text,
				side: side,
				messageId: messages[i].id,
			}
			allMessages.push(obj);
		}
		return allMessages;
	}

	async createDirectMsgRoom(roomData: RoomDto, userId: number, friendId: number) {
		try {
			await this.prismaService.room.create({
				data: {
					name: roomData.name,
					type: roomData.type,
					members: [userId, friendId]
				}
			})
		}
		catch (error) {
			return;
		}
	}
	async getRoomType(roomId: number):  Promise<string> {
		const room  =  await  this.prismaService.room.findUnique({
			where: {
				id: roomId,
			},
			select: {
				type: true,
				owner: true,
				members: true,
				name: true
			}
		});
		if (room)  {
			if (room.owner  ===  null && room.type === "private") {
				return "DM"
			}
			return "CH"
		}
		return "NO"
	}
}