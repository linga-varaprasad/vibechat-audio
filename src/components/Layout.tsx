
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 pb-16 pt-2 max-w-screen-md mx-auto w-full px-4">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
