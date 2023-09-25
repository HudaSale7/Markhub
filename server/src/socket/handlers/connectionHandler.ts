import { Socket } from "socket.io";
import { getUserFromToken } from "../../middleware/getUser.js";
import projectService from "../../modules/project/service.js";
import { Project } from "@prisma/client";

export const connectionHandler = async (socket: Socket) => {
  const token = socket.handshake.headers.token as string;
  const projectId = socket.handshake.query.projectId as string;

  const { user } = getUserFromToken(token);
  if (!user) {
    socket.disconnect();
    return;
  }

  const project = await projectService.findUserProject(
    user.id,
    Number(projectId)
  );
  if (!project || project.accessType !== "EDIT") {
    socket.disconnect();
    return;
  }

  socket.join(projectId);
  socket.emit("projectUpdate", project.project); //when user joins, send project data

  //when user updates project, update project in database and send to all users in room
  socket.on("projectUpdate", async (project: Project) => {
    projectService.updateProject(project);
    socket.broadcast.to(projectId).emit("projectUpdate", project);
  });

  socket.on("disconnect", () => {
    socket.leave(projectId);
  });
};
