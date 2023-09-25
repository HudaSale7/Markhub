import "dotenv/config";
import { Server } from "socket.io";
import http from "http";
import { connectionHandler } from "./handlers/connectionHandler";

export const configSocketServer = (httpServer: http.Server): void => {
  const ioServer = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5174",
    },
  });
  ioServer.on("connection", connectionHandler);
};
