import { Outlet } from "react-router-dom";
import { MainNav } from "./main-nav";

const NavBar = () => {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center  px-20  justify-between">
          <h1 className=" text-2xl font-bold">MarkHub</h1>
          <MainNav className="mx-6" />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
