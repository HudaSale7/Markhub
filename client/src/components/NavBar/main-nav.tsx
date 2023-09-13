import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "../ui/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>

      <Link
        to="/signUp"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        SignUp
      </Link>
      <Link
        to="/login"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Login
      </Link>
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
