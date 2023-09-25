import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import service from "./service.js";

export const projectQuery = {
  getProject: async (_: any, args: { id: any }, contextValue: any) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError("Not Authenticated.", {
        extensions: {
          code: 422,
        },
      });
    }
    const userProject = await service.findUserProject(user.id, +args.id);

    if (!userProject) {
      throw new GraphQLError("Server Error.", {
        extensions: {
          code: 500,
        },
      });
    }
    return userProject;
  },
  getProjects: async (_: any, __: any, contextValue: any) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError("Not Authenticated.", {
        extensions: {
          code: 422,
        },
      });
    }
    const userProjects = await service.findAllUserProject(user.id);
    if (!userProjects) {
      throw new GraphQLError("Server Error.", {
        extensions: {
          code: 500,
        },
      });
    }
    return userProjects;
  },

  getProjectUsersCount: async (
    _: any,
    args: { id: any },
    contextValue: any
  ) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError("Not Authenticated.", {
        extensions: {
          code: 422,
        },
      });
    }
    const userProject = await service.findUserProject(user.id, +args.id);
    if (!userProject) {
      throw new GraphQLError("Server Error.", {
        extensions: {
          code: 500,
        },
      });
    }

    const count = await service.getProjectUsersCount(+args.id);

    return count;
  },
};
