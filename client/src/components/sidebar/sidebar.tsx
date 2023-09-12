import { cn } from "@/lib/utils";
import { Project } from "../ProjectsSideBar/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: Project[];
  isLoading: boolean;
  selectedProjectId: string;
  handleCreateProject: () => void;
  handleDeleteProject: (id: number) => void;
}

export function Sidebar({
  className,
  projects,
  selectedProjectId,
  handleCreateProject,
  handleDeleteProject,
}: SidebarProps) {
  const navigate = useNavigate();

  console.log("selectedProjectId", selectedProjectId);

  return (
    <div className={cn("pb-12", className)}>
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
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Projects
          </h2>
          <div className="space-y-1">
            {projects.map((project) => (
              <Button
                variant={`${
                  project.project.id.toString() === selectedProjectId
                    ? "secondary"
                    : "ghost"
                }`}
                className="w-full justify-start"
                onClick={() => {
                  navigate("/project/" + project.project.id);
                }}
              >
                {project.project.name}
                {project.project.id.toString() === selectedProjectId && (
                  <Button
                    className=" ml-auto"
                    variant="ghost"
                    onClick={() => {
                      handleDeleteProject(project.project.id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
