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
				picture: user.pictureLink,
				bio: user.bio,
				active: user.active,
				game: await this.getMatchHistory(id).valueOf(),
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
			const findIffriend = await this.prismaService.user.findUnique({
				where: {
					id: userId
				},
				select: {
					friends: true
				}
			})
			if (findIffriend.friends.find((id) => id.friendId === friendId)) return;
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
				name: `|${userId}_${friendId}|`,
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
			let roomName: string = `|${userId}_${allFriend[i].id}|`
			let room = await this.prismaService.room.findUnique({
				where: {
					name: roomName
				},
				select: {
					id: true
				}
			})
			if (room) {
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
			else {
				roomName = `|${allFriend[i].id}_${userId}|`
				room = await this.prismaService.room.findUnique({
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
		await this.prismaService.user.update({
			where: {
				id: userId
			},
			data: {
				blocked: {
					push: friendId,
				}
			}
		})
		if (friend) {
			await this.prismaService.friends.delete({
				where: {
					id: friend.id
				}
			})
			let roomName: string = `|${userId}_${friendId}|`
			let room = await this.prismaService.room.findUnique({
				where: {
					name: roomName
				}
			})
			if (!roomName) roomName = `|${friendId}_${userId}|`
			await this.prismaService.room.delete({
				where: {
					name: roomName
				}
			})
		}
	}

	async unBlock(userId: number, friendId: number) {
		
	}

	async getMatchHistory(userId: number) {
		let stats = {
			games: 0,
			wins: 0,
			loses: 0,
		};
		let achievements = {
			bronze: false,
			silver: false,
			gold: false,
		};
		let matchesHistory = [];
		const userGames = await this.prismaService.game.findMany({
			where: {
				userId: userId
			},
			select: {
				gameMode: true,
				time: true,
				score: true,
				result: true,
				opponentId: true
			}
		});
		for (let i = 0; i < userGames.length; i++) {
				const opponentInfo = await this.prismaService.user.findUnique({
				where: {
					id: userGames[i].opponentId
				},
				select: {
					pictureLink: true,
					active: true,
					nickname: true,
				}
			});
			let gameHistory = {
				opponentStatus: opponentInfo.active,
				opponentImgUrl: opponentInfo.pictureLink,
				opponentNickname: opponentInfo.nickname,
				result: userGames[i].result,
				score: userGames[i].score,
				time: userGames[i].time,
				userId: userId,
				gameMode: userGames[i].gameMode,
			};
			matchesHistory.push(gameHistory);
			if (userGames[i].result === "win")
				stats.wins += 1;
			if (userGames[i].result === "loss")
				stats.loses += 1;
		}
		stats.games = userGames.length;
		if (stats.wins >= 2) achievements.bronze = true;
		if (stats.wins >= 4) achievements.silver = true;
		if (stats.wins >= 6) achievements.gold = true;
		return {
			stats: stats,
			achievements: achievements,
			matchesHistory: matchesHistory,
		}
	}

} // End Of UserServices Class
