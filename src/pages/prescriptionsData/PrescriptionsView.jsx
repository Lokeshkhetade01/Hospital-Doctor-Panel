import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorPrescriptions } from "../../redux/slices/prescriptions/getPrescriptionsView";
import { downloadPrescriptionPDF } from "../../redux/slices/prescriptions/getReceiptSlice";
import { 
  FileText, User, Calendar, Pill, 
  ChevronRight, Phone, Clock, Loader2, Search, Download 
} from "lucide-react";

const PrescriptionsView = () => {
  const dispatch = useDispatch();
  const { data, loading, total } = useSelector((state) => state.getPrescriptions);
  // Get loading state for the PDF download
  const { downloadingId } = useSelector((state) => state.getReceipt);

  useEffect(() => {
    dispatch(fetchDoctorPrescriptions());
  }, [dispatch]);

  const handleDownload = (id) => {
    dispatch(downloadPrescriptionPDF(id));
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8">
      {downloadingId && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="p-8 flex flex-col items-center">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-slate-800 font-bold text-lg">Generating Receipt...</p>
            <p className="text-slate-500 text-sm">Please wait, your PDF is being prepared.</p>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Prescription History</h1>
            <p className="text-slate-500 font-medium">You have issued {total} prescriptions in total</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by patient name..." 
              className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-80 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Prescription Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          {data && data.map((item) => (
            <div 
              key={item._id} 
              className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  
                  {/* Patient Info */}
                  <div className="flex gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl shadow-inner">
                      {item.patient?.name?.[0].toUpperCase() || "P"}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {item.patient?.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                          <Phone size={14} className="text-slate-400" /> {item.patient?.phone}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                          <Calendar size={14} className="text-slate-400" /> 
                          {new Date(item.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Diagnosis Badge */}
                  <div className="lg:text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block mb-1">Diagnosis</span>
                    <p className="text-slate-700 font-bold bg-slate-50 px-4 py-2 rounded-xl inline-block border border-slate-100 italic">
                      "{item.diagnosis}"
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Medicines List */}
                  <div className="lg:col-span-8">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Pill size={14} className="text-indigo-500" /> Prescribed Medicines
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.medicines?.map((med, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-[#FBFDFF] border border-slate-100 rounded-2xl">
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{med.name}</p>
                            <p className="text-[11px] text-indigo-500 font-bold uppercase mt-0.5">{med.dosage} • {med.frequency}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold">
                              {med.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Doctor's Advice & Meta */}
                  <div className="lg:col-span-4 bg-slate-50/50 p-6 rounded-3xl border border-dashed border-slate-200">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FileText size={14} className="text-indigo-500" /> Doctor's Advice
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                      {item.advice || "No specific advice provided."}
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-slate-200/60">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-400">Follow-up:</span>
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                          {item.followUpDate ? new Date(item.followUpDate).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer Action */}
              <div className="bg-slate-50 px-8 py-4 flex justify-between items-center border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Prescription ID: {item._id}</span>
                <button 
                  onClick={() => handleDownload(item._id)}
                  disabled={downloadingId === item._id}
                  className="text-indigo-600 text-sm font-black flex items-center gap-1 hover:gap-2 transition-all disabled:opacity-50"
                >
                  {downloadingId === item._id ? (
                    <>Processing... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>View & Download PDF <ChevronRight size={16} /></>
                  )}
                </button>
              </div>
            </div>
          ))}
          
          {data?.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-slate-300" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-400">No prescriptions found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsView;