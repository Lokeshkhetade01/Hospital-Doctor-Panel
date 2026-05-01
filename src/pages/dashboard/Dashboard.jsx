import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/uiElement/Table";
import { fetchDashboardData } from "../../redux/slices/dashboard/dashboardSlice";
import { 
  Users, Calendar, CheckCircle, Star, ArrowUpRight, 
  Search, Bell, Phone, Loader2 
} from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, upcomingAppointments, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Table Columns Definition
  const columns = [
    {
      header: "Patient Profile",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {row.patient.name[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{row.patient.name}</p>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <Phone size={10} /> {row.patient.phone}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Timing",
      render: (row) => (
        <div>
          <p className="text-sm font-bold text-slate-800">{row.timeSlot}</p>
          <p className="text-[11px] text-slate-400">Today</p>
        </div>
      ),
    },
    {
      header: "Symptoms",
      render: (row) => (
        <p className="text-xs text-slate-500 max-w-[150px] truncate bg-slate-50 px-2 py-1 rounded-lg italic">
          "{row.symptoms}"
        </p>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span className={`text-[10px] px-3 py-1.5 rounded-xl font-extrabold uppercase tracking-tight shadow-sm border ${
          row.status === 'pending' 
            ? 'bg-amber-100 text-amber-600 border-amber-200' 
            : 'bg-green-100 text-green-600 border-green-200'
        }`}>
          {row.status}
        </span>
      ),
    },
  ];

  // Table Actions
  const tableActions = (row) => (
    <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all shadow-sm">
      <ArrowUpRight size={18} />
    </button>
  );

  // Stats Data
  const statItems = [
    { title: "Daily Appointments", value: stats?.todayAppointments || 0, icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Total Patients", value: stats?.totalPatients || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Completed Today", value: stats?.completedToday || 0, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Satisfaction", value: `${stats?.rating || 0}/5`, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">Fetching your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
          <p className="font-bold">Error loading dashboard</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white border border-gray-200 text-slate-900 p-6 lg:p-6 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- Top Navbar --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Doctor<span className="text-indigo-600">Portal</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-0.5">Welcome back! Here's your clinic overview.</p>
          </div>

        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statItems.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">{item.title}</p>
                  <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">{item.value}</h3>
                </div>
                <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={22} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="flex items-center text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+4.5%</span>
                <span className="text-slate-400 text-[10px] font-medium">Since last week</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Table Section --- */}
        <div className="">
          <div className=" flex justify-between items-center bg-white border-b border-slate-50">
            <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
              Upcoming Schedule
              <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-100 uppercase tracking-tighter">
                Today
              </span>
            </h3>
            <button className="text-indigo-600 text-xs font-bold hover:underline">View Calendar</button>
          </div>
          
          <div className="">
            <Table 
              columns={columns} 
              data={upcomingAppointments} 
              actions={tableActions} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;