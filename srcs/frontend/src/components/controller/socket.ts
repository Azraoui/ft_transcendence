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

export const game_socket = io(`http://${import.meta.env.VITE_IP}:1337/game`, {
    autoConnect: false,
    auth: {
        token: cookies['TwoFacAuthToken']
    },
});
