import { request, gql } from 'graphql-request';
import { Project, ProjectUpdate } from './types';

export const getProject = async (id: number) => {
  const query = gql`
    query projectsQuery($id: ID!) {
      getProject(id: $id) {
        project {
          content
          name
          id
        }
        accessType
      }
    }
  `;

  const headers = {
    Authorization: localStorage.getItem('token') || '',
  };
  const variables = {
    id: id,
  };
  const data: Project = await request(
    `${import.meta.env.VITE_API}/graphql`,
    query,
    variables,
    headers
  );
  return data;
};

export const updateProjectContent = async (project: ProjectUpdate) => {
  const mutation = gql`
    mutation updateProjectQuery($project: projectUpdateInput!) {
      updateProject(project: $project) {
        content
      }
    }
  `;
  const headers = {
    Authorization: localStorage.getItem('token') || '',
  };
  const variables = {
    project: project
  }
  const data: Project = await request(
    `${import.meta.env.VITE_API}/graphql`,
    mutation,
    variables,
    headers
  );
  return data;
};
