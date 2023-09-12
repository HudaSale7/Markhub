import { request, gql } from 'graphql-request';
import { LoginMutationInput, LoginMutationOutput, GoogleAuthLogin } from './types.js';

export const userLogin = async (user: LoginMutationInput) => {
  const mutation = gql`
    mutation loginQuery($user: userLoginInput!) {
      login(user: $user) {
        id
        token
        name
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

export const googleAuth = async (token: string) => {
  const mutation = gql`
    mutation loginQuery($token: String!) {
      loginWithGoogle(token: $token) {
        id
        name
        token
      }
    }
  `;

  const variables = {
    token: token,
  };

  const data: GoogleAuthLogin = await request(
    `${import.meta.env.VITE_API}/graphql`,
    mutation,
    variables
  );
  return data;
};
