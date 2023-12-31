import { AccessType, Project, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import service from "./service.js";

export const projectMutation = {
  createProject: async (
    _: any,
    args: { project: Project },
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
    const project: Project = args.project;
    const userProject = await service.createProject(project, user.id);
    if (!userProject) {
      throw new GraphQLError("Server Error.", {
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
      throw new GraphQLError("Not Authenticated.", {
        extensions: {
          code: 422,
        },
      });
    }
    const updatedProject = args.updatedProject;

    const previous = await service.findUserProject(user.id, +updatedProject.id);
    if (!previous || previous.accessType === `VIEW`) {
      throw new GraphQLError("Not Allowed to Edit.", {
        extensions: {
          code: 420,
        },
      });
    }

    if (updatedProject.name) {
      previous.project.name = updatedProject.name;
    }
    if (updatedProject.content !== undefined) {
      previous.project.content = updatedProject.content;
    }

    const project = await service.updateProject(previous.project);
    if (!project) {
      throw new GraphQLError("Server Error.", {
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
      throw new GraphQLError("Not Authenticated.", {
        extensions: {
          code: 422,
        },
      });
    }
    const projectId = +args.id;
    const checkAccessType = await service.findUserProject(user.id, projectId);
    if (!checkAccessType || checkAccessType.accessType === `VIEW`) {
      throw new GraphQLError("Not Allowed.", {
        extensions: {
          code: 420,
        },
      });
    }
    const project = await service.deleteProject(projectId);
    if (!project) {
      throw new GraphQLError("Server Error.", {
        extensions: {
          code: 500,
        },
      });
    }
    return project;
  },

  addUserToProject: async (
    _: any,
    args: {
      addUserToProjectInput: {
        projectId: number;
        userEmail: string;
        accessType: AccessType;
      };
    },
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

    const projectId = +args.addUserToProjectInput.projectId;
    const userToAddEmail = args.addUserToProjectInput.userEmail;
    const accessType = args.addUserToProjectInput.accessType;

    //check if user has EDIT access to project

    const checkAccessType = await service.findUserProject(user.id, projectId);
    if (!checkAccessType || checkAccessType.accessType === `VIEW`) {
      throw new GraphQLError("Not Allowed.", {
        extensions: {
          code: 420,
        },
      });
    }

    //check if userToAdd exists
    const userToAdd = await service.findUserByEmail(userToAddEmail);
    if (!userToAdd) {
      throw new GraphQLError("User does not exist.", {
        extensions: {
          code: 404,
        },
      });
    }

    //add user to project with accessType
    const userProject = await service.addUserToProject(
      projectId,
      userToAdd.id,
      accessType
    );

    if (!userProject) {
      throw new GraphQLError("Server Error.", {
        extensions: {
          code: 500,
        },
      });
    }

    return userProject.project;
  },
};
