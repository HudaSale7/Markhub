/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import { shareProjectModal } from "./sweetalert/shareProjectModal";
import { useMutation } from "@tanstack/react-query";
import { addUserToProject } from "./NavBarApi";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const projectId = useParams().id;
  const addUserToProjectMutaion = useMutation({
    mutationFn: addUserToProject,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "User added to project",
      });
    },
    onError: (error: any) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    },
  });

  const handleShareProject = async () => {
    const { value: formValues } = await Swal.fire(shareProjectModal);
    if (formValues && projectId) {
      addUserToProjectMutaion.mutate({
        projectId: +projectId,
        userEmail: formValues.email,
        accessType: formValues.accessType,
      });
    }
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {!token && (
        <Link
          to="/"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Home
        </Link>
      )}

      {!token && (
        <Link
          to="/signUp"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          SignUp
        </Link>
      )}
      {!token && (
        <Link
          to="/login"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Login
        </Link>
      )}

      {token && projectId && (
        <Button
          onClick={handleShareProject}
          disabled={addUserToProjectMutaion.isLoading}
        >
          Share Project
        </Button>
      )}

      {token && (
        <Link
          to="/project"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Projects
        </Link>
      )}
      {token && (
        <Button
          variant="link"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      )}
      <ModeToggle />
    </nav>
  );
}
