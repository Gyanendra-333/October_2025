import { Server } from "socket.io";

const userSocketMap = {};

let io;

export function initSocket(Server) {
    io = new Server(Server, {
        cors: {
            origin: [process.env.FRONTEND_URL]
        }
    })
}
