import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="sm:p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
