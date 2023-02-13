import { chatSocket } from "../../controller/socket";



function invitationModal()
{
chatSocket.on("invited", (inviter)=>{
  // Display invitation (inviter.nickname, inviter.piclink)
  // If click on Decline: chat.socket.emit("declined", inviter.nickname) and stop displaying invitation
  // If click on Accept : disconnect game_socket the use GameInvited.tsx after modifying game_socket query nickname to inviter.nickname and stop displaying invitation
})
chatSocket.on("expired", (inviter)=>{
  // stop displaying invitation of inviter
})
}