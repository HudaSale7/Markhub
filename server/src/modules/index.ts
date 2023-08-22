import { userTypes, userMutation } from './user';

export const typeDefs = `#graphql
  ${userTypes}
`;

export const resolvers = {
  Mutation: {
    ...userMutation,
  },
};
