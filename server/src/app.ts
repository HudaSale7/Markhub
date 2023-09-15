import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './modules/index.js';
import { getUser } from './middleware/getUser.js';

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: getUser
});

console.log(`🚀 Server listening at: ${url}`);