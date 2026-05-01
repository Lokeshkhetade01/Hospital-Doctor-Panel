import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientHistory, clearHistory } from "../../redux/slices/patient/getPatientHistorySlice";
import { 
  ArrowLeft, Calendar, FileText, Activity, 
  Stethoscope, Clock, Pill, ChevronRight, 
  Download, Loader2, User 
} from "lucide-react";

const PatientHistory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.patientHistory);

  useEffect(() => {
    dispatch(fetchPatientHistory(id));
    return () => dispatch(clearHistory());
  }, [dispatch, id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  if (!data) return null;

  const { patient, appointments, prescriptions } = data;

  return (
    <div className="min-h-screen bg-white border border-gray-200 p-4 lg:p-6 font-sans">
      <div className="max-w-full mx-auto">
        
        {/* Top Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm"
        >
          <ArrowLeft size={18} /> Back to Patients
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Patient Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[1rem] p-8 shadow-sm border border-slate-100 sticky top-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-[2rem] bg-indigo-50 border-4 border-white shadow-lg overflow-hidden mb-4">
                  {patient.avatar ? <img src={patient.avatar} alt="" className="w-full h-full object-cover"/> : <User size={40} className="m-auto mt-6 text-indigo-300"/>}
                </div>
                <h2 className="text-xl font-black font-semibold text-slate-800">{patient.name}</h2>
                <p className="text-indigo-600 text-sm font-bold tracking-widest mt-1">Patient ID: {id.slice(-6)}</p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm"><Calendar size={18}/></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase">Date of Birth</p><p className="text-sm font-bold text-slate-700">{new Date(patient.dob).toLocaleDateString('en-GB')}</p></div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm"><Activity size={18}/></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase">Gender</p><p className="text-sm font-bold text-slate-700 capitalize">{patient.gender}</p></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: History Timeline & Prescriptions */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Appointments Section */}
            <section>
              <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="text-indigo-600" size={20}/> Appointment Timeline
              </h3>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-all">
                    <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl font-black text-center min-w-[70px]">
                      <span className="block text-xl">{new Date(apt.date).getDate()}</span>
                      <span className="text-[10px] uppercase">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">{apt.timeSlot}</h4>
                        <span className={`text-[10px] px-2 py-1 rounded-lg font-black uppercase ${apt.isPaid ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {apt.isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-2 italic bg-slate-50 p-3 rounded-xl border-l-4 border-indigo-200">
                        "{apt.symptoms}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Prescriptions Section */}
            <section>
              <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="text-indigo-600" size={20}/> Prescriptions & Diagnosis
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {prescriptions.map((pre) => (
                  <div key={pre._id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Diagnosis</p>
                        <h4 className="text-lg font-black tracking-tight">{pre.diagnosis}</h4>
                      </div>
                      <button className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><Download size={20}/></button>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {pre.medicines.map((med, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm"><Pill size={18}/></div>
                            <div>
                              <p className="text-sm font-black text-slate-800">{med.name}</p>
                              <p className="text-[11px] text-slate-500 font-bold">{med.dosage} • {med.frequency}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-slate-50 pt-6">
                        <div className="flex items-start gap-3">
                          <Stethoscope size={16} className="text-indigo-500 mt-1"/>
                          <div>
                            <p className="text-xs font-black text-slate-400 uppercase mb-1">Doctor's Advice</p>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">{pre.advice}</p>
                          </div>
                        </div>
                        {pre.followUpDate && (
                          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 w-fit px-3 py-1.5 rounded-lg">
                            <Calendar size={14}/> Next Follow up: {new Date(pre.followUpDate).toLocaleDateString('en-GB')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;