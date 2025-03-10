import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 flex justify-center items-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
