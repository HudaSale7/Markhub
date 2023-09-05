import { request, gql } from 'graphql-request';
import { ProjectCreateInput, ProjectCreateOutput, Projects } from './types';

export const createProject = async (project: ProjectCreateInput) => {
  const query = gql`
    mutation createProjectQuery($project: projectCreateInput!) {
      createProject(project: $project) {
        name
        content
        id
      }
    }
  `;
  const variables = {
    project: project,
  };
  const headers = {
    Authorization: localStorage.getItem('token') || '',
  };

  const data: ProjectCreateOutput = await request(
    `${import.meta.env.VITE_API}/graphql`,
    query,
    variables,
    headers
  );
  return data;
};

export const getProjects = async () => {
  const query = gql`
    query projectsQuery {
      getProjects {
        project {
          name,
          id
        }
        accessType
      }
    }
  `;
  const headers = {
    Authorization: localStorage.getItem('token') || '',
  };

  const data: Projects = await request(
    `${import.meta.env.VITE_API}/graphql`,
    query,
    {},
    headers
  );
  return data;
};
