import { addUserToProjectInput } from "./types";
import { request, gql } from "graphql-request";
export const addUserToProject = async (
  addUserToProjectInput: addUserToProjectInput
) => {
  const mutation = gql`
    mutation addUserToProjectMutation(
      $addUserToProjectInput: addUserToProjectInput!
    ) {
      addUserToProject(addUserToProjectInput: $addUserToProjectInput) {
        name
        content
        id
      }
    }
  `;
  const variables = {
    addUserToProjectInput: addUserToProjectInput,
  };
  const headers = {
    Authorization: localStorage.getItem("token") || "",
  };
  const data = await request(
    `${import.meta.env.VITE_API}/graphql`,
    mutation,
    variables,
    headers
  );
  return data;
};
