import { Outlet } from 'react-router-dom';
const NavBar = () => {
  return (
    <>
      <div>Hello from nav bar</div>
      <Outlet />
    </>
  );
};

export default NavBar;
