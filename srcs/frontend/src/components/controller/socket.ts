import io from "socket.io-client";

let cookies = Object.fromEntries(document.cookie.split('; ').map(c => {
    const [ key, ...v ] = c.split('=');
    return [ key, v.join('=') ];
}));

export const chatSocket = io(
    `http://${import.meta.env.VITE_IP}:5000/pingpong`,
    {
        auth: {
            token: cookies['TwoFacAuthToken']
        },
        query: {
            service : "chat"
        }
    }
).on("invited", (inviter)=>{
    console.log("inviter by", inviter.nickname);
}).on("expired", (inviter)=>{
    
});

export const game_socket = io(`http://${import.meta.env.VITE_IP}:5000/pingpong`, {
    autoConnect: false,
    auth: {
        token: cookies['TwoFacAuthToken']
    },
});
