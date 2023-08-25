import { userTypes, userMutation } from './user';
import { projectQuery, projectTypes, projectMutation } from './project';

export const typeDefs = `#graphql
  type Query
  type Mutation
  ${userTypes}
  ${projectTypes}
`;

export const resolvers = {
  Query: {
    ...projectQuery,
  },
  Mutation: {
    ...userMutation,
    ...projectMutation,
  },
};
