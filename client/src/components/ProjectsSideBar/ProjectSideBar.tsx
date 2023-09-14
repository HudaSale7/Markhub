import { Outlet, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProjectName,
} from "./ProjectSideBarApi";
import Swal from "sweetalert2";

import { Sidebar } from "../Sidebar/Sidebar";
const ProjectSideBar = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleCreateProject = async () => {
    const { value: name } = await Swal.fire({
      title: "Project Name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Please Enter the Project Name";
        }
        if (value.match(/^\d/)) {
          return "Project Name should not start with a number";
        }
      },
    });
    if (name) {
      createProjectMutation.mutate({ name: name, content: `# ${name}` });
    }
  };

  const handleDeleteProject = (id: number) => {
    deleteProjectMutation.mutate(id);
  };

  const handleRenameProject = async (id: number) => {
    const { value: name } = await Swal.fire({
      inputValue:
        query.data?.getProjects.find((project) => project.project.id === id)
          ?.project.name || "",
      title: "Edit Project Name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Please Enter the Project Name";
        }
        if (value.match(/^\d/)) {
          return "Project Name should not start with a number";
        }
      },
    });
    if (name) {
      updateProjectMutation.mutate({ id: id, name: name });
    }
  };

  const queryClient = useQueryClient();
  const query = useQuery(["projects"], getProjects);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["projects"]);
      navigate(`/project/${data.createProject.id}`);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: (_, variables: number) => {
      queryClient.invalidateQueries(["projects"]);
      queryClient.removeQueries({ queryKey: ["project", variables] });
      navigate("/project");
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: updateProjectName,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  return (
    <>
      <div className="w-60 absolute left-0 border-r h-[calc(100%-4rem)]">
        <Sidebar
          projects={query.data?.getProjects || []}
          isLoading={query.isLoading}
          selectedProjectId={id || "-1"}
          handleCreateProject={handleCreateProject}
          handleDeleteProject={handleDeleteProject}
          handleRenameProject={handleRenameProject}
          className="hidden lg:block"
        />
      </div>

      <Outlet />
    </>
  );
};

export default ProjectSideBar;
