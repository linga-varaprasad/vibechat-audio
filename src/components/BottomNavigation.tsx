
import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, Bell, User } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-sm z-50">
      <div className="max-w-screen-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <NavLink to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <Home className="w-6 h-6" />
            <span>Home</span>
          </NavLink>
          
          <NavLink to="/rooms" className={`nav-item ${isActive('/rooms') ? 'active' : ''}`}>
            <Search className="w-6 h-6" />
            <span>Explore</span>
          </NavLink>
          
          <NavLink to="/notifications" className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}>
            <Bell className="w-6 h-6" />
            <span>Notifications</span>
          </NavLink>
          
          <NavLink to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
            <User className="w-6 h-6" />
            <span>Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
