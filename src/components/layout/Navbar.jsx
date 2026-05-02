import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut,
  Maximize,
  LogOutIcon
} from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // Profile handle karne ke liye simple toggle
  const toggleProfile = () => setShowProfile(!showProfile);
const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };
  return (
    <nav className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      
      {/* 1. Left Side: Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
       <h1 className="font-extrabold text-2xl text-blue-800">Admin Panel</h1>
      </div>

      {/* 2. Right Side: Actions & Profile */}
      <div className="flex items-center gap-6">
      

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={toggleProfile}
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all active:scale-95 border border-transparent hover:border-slate-100"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
             {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-slate-800 leading-tight">{user?.name || "Doctor User"}</p>

              {/* <p className="text-[11px] font-medium text-blue-500 uppercase tracking-tighter">Super Admin</p> */}
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
              
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <LogOutIcon size={16} /> Logout 
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;