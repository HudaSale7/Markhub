import { Outlet } from 'react-router-dom';

const ProjectSideBar = () => {
  return (
    <>
          <div>Hello from project side bar</div>
          <Outlet/>
    </>
  );
};

export default ProjectSideBar;
