import {
  GoogleAuthLogin,
  SignUpMutationInput,
  SignUpMutationOutput,
} from "./types";
import { request, gql } from "graphql-request";

export const userSignUp = async (user: SignUpMutationInput) => {
  const mutation = gql`
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
