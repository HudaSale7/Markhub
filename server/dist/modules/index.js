import { userTypes, userMutation } from './user/index.js';
import { projectQuery, projectTypes, projectMutation, } from './project/index.js';
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
