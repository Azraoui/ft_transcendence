import io from "socket.io-client";

let cookies = Object.fromEntries(document.cookie.split('; ').map(c => {
    const [ key, ...v ] = c.split('=');
    return [ key, v.join('=') ];
}));

export const chatSocket = io(
    `http://${import.meta.env.VITE_IP}:5000/chat`,
    {
        auth: {
            token: cookies['TwoFacAuthToken']
        }
    }
);

// const role:string = "player";


// export const new_socket = io(`http://${import.meta.env.VITE_IP}:5000/game`, {
//     // autoConnect: false,
//     reconnection: true,
//     transports: ["websocket"],
//     query: {
//         role: "player",
//     },
// });
 