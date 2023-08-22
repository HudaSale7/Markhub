import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { prisma } from './util/db.js';

const typeDefs = `#graphql
  type Query {
    hello: String!
  }
`;

console.log(typeDefs);
