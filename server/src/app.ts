import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './modules';

const server = new ApolloServer({ typeDefs, resolvers });
startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at 4000`);
