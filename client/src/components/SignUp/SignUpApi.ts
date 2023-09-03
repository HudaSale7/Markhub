import { SignUpMutationInput, SignUpMutationOutput } from './types';
import { request, gql } from 'graphql-request';

export const userSignUp = async (user: SignUpMutationInput) => {
  const query = gql`
    mutation loginQuery($user: userCreateInput!) {
      signup(user: $user) {
        id
        token
      }
    }
  `;
  const variables = {
    user: user,
  };
  const data: SignUpMutationOutput = await request(
    `${import.meta.env.VITE_API}/graphql`,
    query,
    variables
  );
  return data;
};
