import { User } from '@prisma/client';
import { prisma } from '../../util/db.js';
import { GraphQLError } from 'graphql';

export const projectQuery = {
  getProject: async (_: any, args: { id: any }, contextValue: any) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError('Not Authenticated.', {
        extensions: {
          code: 422,
        },
      });
    }
    const userProject = await prisma.userProject.findUnique({
      where: {
        userId_projectId: { userId: user.id, projectId: +args.id },
      },
      select: {
        project: true,
        accessType: true,
      },
    });

    if (!userProject) {
      throw new GraphQLError('Server Error.', {
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
      throw new GraphQLError('Not Authenticated.', {
        extensions: {
          code: 422,
        },
      });
    }
    const userProjects = await prisma.userProject.findMany({
      select: {
        project: true,
        accessType: true,
      },
      where: {
        userId: user.id,
      },
    });
    if (!userProjects) {
      throw new GraphQLError('Server Error.', {
        extensions: {
          code: 500,
        },
      });
    }
    return userProjects;
  },
};
