import { Project, User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import service from './service.js';

export const projectMutation = {
  createProject: async (
    _: any,
    args: { project: Project },
    contextValue: any
  ) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError('Not Authenticated.', {
        extensions: {
          code: 422,
        },
      });
    }
    const project: Project = args.project;
    const userProject = await service.createProject(project, user.id);
    if (!userProject) {
      throw new GraphQLError('Server Error.', {
        extensions: {
          code: 500,
        },
      });
    }
    return userProject.project;
  },

  updateProject: async (
    _: any,
    args: { updatedProject: Project },
    contextValue: any
  ) => {
    const user: User = contextValue.user;
    if (!user) {
      throw new GraphQLError('Not Authenticated.', {
        extensions: {
          code: 422,
        },
      });
    }
    const updatedProject = args.updatedProject;

    const checkAccessType = await service.findUserProject(
      user.id,
      +updatedProject.id
    );
    if (!checkAccessType || checkAccessType.accessType === `VIEW`) {
      throw new GraphQLError('Not Allowed.', {
        extensions: {
          code: 420,
        },
      });
    }

    const project = await service.updateProject(updatedProject);
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
    const checkAccessType = await service.findUserProject(user.id, projectId);
    if (!checkAccessType || checkAccessType.accessType === `VIEW`) {
      throw new GraphQLError('Not Allowed.', {
        extensions: {
          code: 420,
        },
      });
    }
    const project = await service.deleteProject(projectId);
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
