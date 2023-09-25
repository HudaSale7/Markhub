export const projectTypes = /* GraphQL */ `
  type Project {
    id: ID!
    name: String!
    content: String!
  }
  type ProjectAccessType {
    project: Project
    accessType: String
  }
  extend type Query {
    getProjects: [ProjectAccessType!]
    getProject(id: ID!): ProjectAccessType!
    getProjectUsersCount(id: ID!): Int!
  }
  extend type Mutation {
    createProject(project: projectCreateInput!): Project
    updateProject(updatedProject: projectUpdateInput!): Project
    deleteProject(id: ID!): Project
    addUserToProject(addUserToProjectInput: addUserToProjectInput): Project
  }
  input projectCreateInput {
    name: String!
    content: String!
  }

  input addUserToProjectInput {
    projectId: ID!
    userEmail: String!
    accessType: AccessType!
  }

  input projectUpdateInput {
    id: ID!
    content: String
    name: String
  }

  enum AccessType {
    EDIT
    VIEW
  }
`;
