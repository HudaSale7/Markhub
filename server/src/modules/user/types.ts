export const userTypes = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  type AuthPayload {
    token: String!
    id: ID!
    name: String!
  }
  extend type Mutation {
    signup(user: userCreateInput!): AuthPayload!
    login(user: userLoginInput!): AuthPayload!
    loginWithGoogle(token: String!): AuthPayload!
  }
  input userCreateInput {
    name: String!
    email: String!
    password: String!
  }
  input userLoginInput {
    email: String!
    password: String!
  }
`;
