import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectUsersCount } from "./ProjectApi";
import { ProjectGraphQl } from "./ProjectGraphQl";
import { ProjectSocketIO } from "./ProjectSocketIO";

export const Project = () => {
  const { id } = useParams();
  const projectCountQuery = useQuery(["projectCount", id], () =>
    getProjectUsersCount(Number(id))
  );

  if (projectCountQuery.isLoading) return <div>Loading...</div>;

  if (projectCountQuery.isError) return <div>Error</div>;

  return (
    <>
      {projectCountQuery.data?.getProjectUsersCount > 1 ? (
        <ProjectSocketIO />
      ) : (
        <ProjectGraphQl />
      )}
    </>
  );
};
