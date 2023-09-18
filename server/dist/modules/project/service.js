import { prisma } from "../../util/db.js";
const createProject = async (project, userId) => {
    const result = await prisma.userProject.create({
        data: {
            accessType: "EDIT",
            user: {
                connect: {
                    id: userId,
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
    return result;
};
const updateProject = async (project) => {
    const result = await prisma.project.update({
        where: {
            id: +project.id,
        },
        data: {
            name: project.name,
            content: project.content,
        },
    });
    return result;
};
const deleteProject = async (projectId) => {
    const result = await prisma.project.delete({
        where: {
            id: projectId,
        },
    });
    return result;
};
const findUserProject = async (userId, projectId) => {
    const result = await prisma.userProject.findUnique({
        where: {
            userId_projectId: { userId: userId, projectId: projectId },
        },
        select: {
            accessType: true,
            project: true,
        },
    });
    return result;
};
const findAllUserProject = async (userId) => {
    const result = await prisma.userProject.findMany({
        select: {
            project: true,
            accessType: true,
        },
        where: {
            userId: userId,
        },
    });
    return result;
};
const findUserByEmail = async (email) => {
    const result = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return result;
};
const addUserToProject = async (projectId, userId, accessType) => {
    const result = await prisma.userProject.create({
        data: {
            accessType: accessType,
            user: {
                connect: {
                    id: userId,
                },
            },
            project: {
                connect: {
                    id: projectId,
                },
            },
        },
        select: {
            project: true,
        },
    });
    return result;
};
export default {
    createProject,
    updateProject,
    deleteProject,
    findAllUserProject,
    findUserProject,
    findUserByEmail,
    addUserToProject,
};
