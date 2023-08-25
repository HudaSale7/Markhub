import { Project, User } from '@prisma/client';
import { prisma } from '../../util/db.js';
import { GraphQLError } from 'graphql';

export const projectMutation = {
  createProject: async (_: any, args: { project: any }, contextValue: any) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError('Not Authenticated.', {
        extensions: {
          code: 422,
        },
      });
    }
    const project: Project = args.project;
    const userProject = await prisma.userProject.create({
      data: {
        accessType: 'EDIT',
        user: {
          connect: {
            id: user.id,
          },
        },
        project: {
          create: project,
        },
      },
      select: {
        project: true,
      },
    });
    if (!userProject) {
      throw new GraphQLError('Server Error.', {
        extensions: {
          code: 500,
        },
      });
    }
    return userProject.project;
  },

  updateProject: async (_: any, args: { updatedProject: any }, contextValue: any) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError('Not Authenticated.', {
        extensions: {
          code: 422,
        },
      });
    }
    const updatedProject = args.updatedProject;

    const checkAccessType = await prisma.userProject.findUnique({
      where: {
        userId_projectId: { userId: user.id, projectId: +updatedProject.id },
      },
      select: {
        accessType: true,
      },
    });
    if (!checkAccessType || checkAccessType.accessType === `VIEW`) {
      throw new GraphQLError('Not Allowed.', {
        extensions: {
          code: 420,
        },
      });
    }

    const project = await prisma.project.update({
      where: {
        id: +updatedProject.id,
      },
      data: {
        name: updatedProject.name,
        content: updatedProject.content,
      },
    });
    if (!project) {
      throw new GraphQLError('Server Error.', {
        extensions: {
          code: 500,
        },
      });
    }
    return project;
  },

  deleteProject: async (_: any, args: { id: any }, contextValue: any) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError('Not Authenticated.', {
        extensions: {
          code: 422,
        },
      });
    }
    const projectId = +args.id;
    const checkAccessType = await prisma.userProject.findUnique({
      where: {
        userId_projectId: { userId: user.id, projectId: projectId },
      },
      select: {
        accessType: true,
      },
    });
    if (!checkAccessType || checkAccessType.accessType === `VIEW`) {
      throw new GraphQLError('Not Allowed.', {
        extensions: {
          code: 420,
        },
      });
    }
    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new GraphQLError('Server Error.', {
        extensions: {
          code: 500,
        },
      });
    }
    return project;
  },
};
