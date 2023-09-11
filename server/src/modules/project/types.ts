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
  }
  extend type Mutation {
    createProject(project: projectCreateInput!): Project
    updateProject(updatedProject: projectUpdateInput!): Project
    deleteProject(id: ID!): Project
  }
  input projectCreateInput {
    name: String!
    content: String!
  }
  input projectUpdateInput {
    id: ID!
    content: String
    name: String
  }
`;
