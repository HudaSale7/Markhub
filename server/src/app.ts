import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./modules/index.js";
import { getUser } from "./middleware/getUser.js";
import { ApolloServer } from "@apollo/server";
import { configSocketServer } from "./socket/index.js";

const app = express();
const httpServer = http.createServer(app);

const graphQlServer = new ApolloServer({ typeDefs, resolvers });
await graphQlServer.start();

app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  expressMiddleware(graphQlServer, {
    context: getUser,
  })
);

configSocketServer(httpServer);

httpServer.listen(4000, () => {
  console.log("Server is running on port 4000");
});
