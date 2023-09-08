import { request, gql } from 'graphql-request';
import { LoginMutationInput, LoginMutationOutput } from './types.js';

export const userLogin = async (user: LoginMutationInput) => {
  const mutation = gql`
    mutation loginQuery($user: userLoginInput!) {
      login(user: $user) {
        id
        token
      }
    }
  `;
  const variables = {
    user: user,
  };

  const data: LoginMutationOutput = await request(
    `${import.meta.env.VITE_API}/graphql`,
    mutation,
    variables
  );
  return data;
};
