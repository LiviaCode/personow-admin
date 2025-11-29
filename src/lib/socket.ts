// app/socket/socket.ts
import { io } from "socket.io-client";

export const socket = io("http://34.39.211.212:3018", {
  transports: ["websocket"],
});
