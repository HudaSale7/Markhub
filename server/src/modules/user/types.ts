export const userTypes = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  type Query {
    user: User!
  }
  type Mutation {
    signup(user: userCreateInput!): AuthPayload!
    login(user: userLoginInput!): AuthPayload!
  }
  type AuthPayload {
    token: String!
    id: ID!
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
