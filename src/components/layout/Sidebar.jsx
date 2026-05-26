import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // 1. Dispatch import kiya
// import { logout } from "../../../redux/slices/auth/authSlice"; // 2. Logout action import kiya (path check kar lein)
import { logout } from "../../redux/slices/auth/authSlice";
import { 
  CalendarDays,
  LayoutDashboard, LogOutIcon, PanelTopIcon,
  User2Icon,
  UserRoundPlus
} from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch(); // 3. Dispatch initialize kiya
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // 4. Redux state clear hogi aur localStorage se token hatega
    navigate("/"); // 5. Login page (ya home) par redirect
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Appointments", icon: <CalendarDays size={20} />, path: "/appointments" },
    { name: "Prescription History", icon: <PanelTopIcon size={20} />, path: "/prescriptions" },
    { name: "My Patients", icon: <User2Icon size={20} />, path: "/patients" },
    // { name: "Schedule", icon: <PanelTopIcon size={20} />, path: "/schedule" },
    { name: "My Profile", icon: <UserRoundPlus size={20} />, path: "/profile" },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#002B5B] text-white flex flex-col shadow-2xl border-r border-white/5 font-sans">
      
      {/* Brand Header */}
      <div className="p-8 pb-10">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          MediCare<span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
        </h2>
        <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mt-1 opacity-80">
          Doctor Panel
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
              ${isActive 
                ? "bg-blue-600/30 text-white shadow-inner border border-white/10" 
                : "text-slate-300 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            {({ isActive }) => (
              <>
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 mt-auto border-t border-white/5 space-y-2">
        {/* NavLink ko Button se change kiya taaki click handle ho sake */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all border border-red-500/50 text-slate-300 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOutIcon size={20} />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;