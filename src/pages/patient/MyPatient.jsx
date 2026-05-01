import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../redux/slices/patient/getPatientSlice";
// import Table from "./Table";
import Table from "../../components/uiElement/Table";
import { 
  User, Mail, Phone, Calendar, 
  Search, Filter, ExternalLink, Loader2,
  Users, Activity,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyPatient = () => {
  const dispatch = useDispatch();
  const { data, loading, total, error } = useSelector((state) => state.patients);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // Table Column Definitions
  const columns = [
    {
      header: "Patient",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl overflow-hidden bg-indigo-100 flex-shrink-0 border border-indigo-50 shadow-sm">
            {row.avatar ? (
              <img src={row.avatar} alt={row.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                {row.name[0]}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-sm tracking-tight">{row.name}</span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
              <Mail size={10} /> {row.email}
            </span>
          </div>
        </div>
      )
    },
    {
      header: "Contact",
      render: (row) => (
        <div className="text-slate-600 text-xs font-semibold flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
            <Phone size={12} />
          </div>
          {row.phone}
        </div>
      )
    },
    {
      header: "Visits",
      render: (row) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-indigo-600">{row.visitCount}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Visits</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Last: {new Date(row.lastVisit).toLocaleDateString('en-GB')}</span>
        </div>
      )
    },
    {
      header: "Gender/DOB",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-700 capitalize">{row.gender || "N/A"}</span>
          <span className="text-[11px] text-slate-400">
            {row.dob ? new Date(row.dob).toLocaleDateString('en-GB') : "Not provided"}
          </span>
        </div>
      )
    },
    {
      header: "Last Status",
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
          row.lastStatus === 'pending' 
          ? 'bg-amber-50 text-amber-600 border-amber-100' 
          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
        }`}>
          {row.lastStatus}
        </span>
      )
    }
  ];

  const tableActions = (row) => (
   <button 
   onClick={() => navigate(`/patients/history/${row._id}`)}
    className="p-2.5 rounded-xl hover:text-indigo-600 cursor-pointer hover:border-indigo-100 hover:bg-indigo-50 transition-all shadow-sm group"
    title="View Details"
  >
    <Eye size={18} className="group-hover:scale-110 transition-transform" />
  </button>
  );

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">Loading patient records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white border border-gray-200 p-6 lg:p-6 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
               Patient Database
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Manage and track patient medical history ({total})</p>
          </div>
        </div>

        {/* Stats Summary Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[1rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
              <Users size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Registered</p>
              <h3 className="text-2xl font-black text-slate-800">{total}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
              <Activity size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Cases</p>
              <h3 className="text-2xl font-black text-slate-800">{data.filter(p => p.lastStatus === 'pending').length}</h3>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="p-2 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-800">All Patients</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 cursor-pointer hover:underline">
              Export PDF
            </div>
          </div>
          <div className="">
            <Table 
              columns={columns} 
              data={data} 
              actions={tableActions} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyPatient;