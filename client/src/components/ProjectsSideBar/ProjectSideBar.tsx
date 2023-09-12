import { Outlet, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createProject, deleteProject, getProjects } from "./ProjectSideBarApi";
import Swal from "sweetalert2";

import { Sidebar } from "../sidebar/sidebar";
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

  const queryClient = useQueryClient();
  const query = useQuery(["projects"], getProjects);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['projects']);
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

  return (
    <>
      <div className="w-60 absolute left-0 border-r h-[calc(100%-4rem)]">
        <Sidebar
          projects={query.data?.getProjects || []}
          isLoading={query.isLoading}
          selectedProjectId={id || "-1"}
          handleCreateProject={handleCreateProject}
          handleDeleteProject={handleDeleteProject}
          className="hidden lg:block"
        />
      </div>

      <Outlet />
    </>
  );
};

export default ProjectSideBar;
