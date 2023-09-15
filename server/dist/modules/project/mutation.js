import { GraphQLError } from "graphql";
import service from "./service.js";
export const projectMutation = {
    createProject: async (_, args, contextValue) => {
        const user = contextValue.user;
        if (!user) {
            throw new GraphQLError("Not Authenticated.", {
                extensions: {
                    code: 422,
                },
            });
        }
        const project = args.project;
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
    updateProject: async (_, args, contextValue) => {
        const user = contextValue.user;
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
            throw new GraphQLError("Not Allowed.", {
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
    deleteProject: async (_, args, contextValue) => {
        const user = contextValue.user;
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
};
