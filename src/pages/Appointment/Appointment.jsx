import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "../../redux/slices/appointment/appointmentSlice";
import { updateAppointmentStatus } from "../../redux/slices/appointment/updateStatusSlice";
import Table from "../../components/uiElement/Table";
import Button from "../../components/uiElement/Button";
import { 
  Calendar, Clock, Phone, Search, Filter, Loader2,
  CheckCircle2, AlertCircle, Edit, X, Save,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const dispatch = useDispatch();
  const { data, loading, total } = useSelector((state) => state.appointments);
  const { loading: updateLoading } = useSelector((state) => state.updateStatus);
  const navigate = useNavigate()
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  const handleOpenModal = (row) => {
    setSelectedAppointment(row);
    setNewStatus(row.status);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    await dispatch(updateAppointmentStatus({ 
      id: selectedAppointment._id, 
      status: newStatus 
    }));
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: "Patient Details",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="relative">
            {row.patient.avatar ? (
              <img src={row.patient.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {row.patient.name[0]}
              </div>
            )}
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${row.isPaid ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          </div>
          <div>
            <p className="font-bold text-slate-800">{row.patient.name}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1"><Phone size={10}/> {row.patient.phone}</p>
          </div>
        </div>
      )
    },
    {
      header: "Date & Time",
      render: (row) => (
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Calendar size={14} className="text-indigo-500" />
            {new Date(row.date).toLocaleDateString('en-GB')}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-medium"><Clock size={14} />{row.timeSlot}</div>
        </div>
      )
    },
    {
      header: "Amount",
      render: (row) => (
        <div>
          <p className="font-bold text-slate-800">₹{row.totalAmount}</p>
          <p className={`text-[10px] font-black uppercase ${row.isPaid ? 'text-green-500' : 'text-amber-500'}`}>
            {row.isPaid ? 'Payment Success' : 'Payment Pending'}
          </p>
        </div>
      )
    },
    {
      header: "Status",
      render: (row) => {
        const styles = {
          pending: "bg-amber-50 text-amber-600 border-amber-100",
          completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
          cancelled: "bg-red-50 text-red-600 border-red-100"
        };
        return (
          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[row.status] || styles.pending}`}>
            {row.status}
          </span>
        );
      }
    },
    {
  header: "Prescriptions",
  render: (row) => {
    const isDone = row?.isPrescriptionDone; 
    
    return (
      <div className="flex items-center">
        {isDone ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 group transition-all hover:bg-emerald-100">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
               <CheckCircle2 size={12} className="text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
              Completed
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 group transition-all hover:bg-amber-50 hover:border-amber-100">
            <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-amber-400">
               <Clock size={12} className="text-slate-500 group-hover:text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-amber-600">
              Pending
            </span>
          </div>
        )}
      </div>
    );
  }
},
    {
      header: "Update Status",
      render: (row) => (
        <>
        <button 
          onClick={() => handleOpenModal(row)}
          className="p-2 cursor-pointer bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          title="Update Status"
        >
          <Edit size={16} />
        </button>
        <button 
  onClick={() => navigate(`/appointments/prescriptions/${row._id}`, { state: { appointment: row } })}
  className="p-2 mx-2 cursor-pointer bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
  title="View/Create Prescription"
>
  <Eye size={16} />
</button>
        </>
      )
    }
    
  ];

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-6 font-sans border border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Area */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Appointments</h2>
            <p className="text-slate-500 text-sm font-medium">Total {total} appointments scheduled</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search..." className="w-64 bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm" />
             </div>
             <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 shadow-sm"><Filter size={18} /></button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><Calendar size={24}/></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</p><p className="text-xl font-black">{total}</p></div>
           </div>
           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={24}/></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">payment Paid</p><p className="text-xl font-black">{data.filter(a => a.isPaid).length}</p></div>
           </div>
           <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><AlertCircle size={24}/></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status Pending</p><p className="text-xl font-black">{data.filter(a => a.status === 'pending').length}</p></div>
           </div>
        </div>

        <Table columns={columns} data={data} />
        {/* Update Status Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-black text-slate-800">Update Appointment</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><X size={20}/></button>
              </div>
              
              <div className="p-8">
                <div className="mb-6 flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-indigo-600 shadow-sm">{selectedAppointment?.patient.name[0]}</div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{selectedAppointment?.patient.name}</p>
                    <p className="text-xs text-slate-500">{selectedAppointment?.timeSlot} | {new Date(selectedAppointment?.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Choose New Status</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <div className="grid grid-cols-2 gap-4 mt-10">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button 
                    variant="primary" 
                    icon={Save} 
                    loading={updateLoading} 
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;