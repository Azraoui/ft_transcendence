import io from "socket.io-client";


export const chatSocket = io(`http://${import.meta.env.VITE_IP}:1337/chat`);
