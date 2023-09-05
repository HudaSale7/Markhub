import { Outlet } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <>
      <div className='navbar'>Hello from nav bar</div>
      <Outlet />
    </>
  );
};

export default NavBar;
