import { request, gql } from 'graphql-request';
import { Project } from './types';

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
