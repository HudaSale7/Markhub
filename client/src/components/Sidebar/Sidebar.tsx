import { Project } from "../ProjectsSideBar/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: Project[];
  isLoading: boolean;
  selectedProjectId: string;
  handleCreateProject: () => void;
  handleDeleteProject: (id: number) => void;
  handleRenameProject: (id: number) => void;
}

export function Sidebar({
  projects,
  selectedProjectId,
  handleCreateProject,
  handleDeleteProject,
  handleRenameProject,
}: SidebarProps) {
  const navigate = useNavigate();

  return (
    <div className={"pb-12"}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Button
            className="w-full  text-center justify-center mb-5"
            onClick={() => {
              handleCreateProject();
            }}
          >
            Create Project
          </Button>
          <div className="space-y-1">
            {projects.map((project) => (
              <Button
                key={project.project.id}
                variant={`${
                  project.project.id.toString() === selectedProjectId
                    ? "secondary"
                    : "ghost"
                }`}
                className="w-full justify-between px-2"
                onClick={() => {
                  navigate("/project/" + project.project.id);
                }}
              >
                {project.project.name}
                {project.project.id.toString() === selectedProjectId && (
                  <div>
                    <Button
                      className=" ml-auto px-2 py-1"
                      variant="ghost"
                      onClick={() => {
                        handleRenameProject(project.project.id);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      className=" ml-auto px-2 py-1"
                      variant="ghost"
                      onClick={() => {
                        handleDeleteProject(project.project.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
