import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPrescription } from "../../redux/slices/appointment/prescriptionSlice";
import { Plus, Trash2, Save, ArrowLeft, Stethoscope, Pill, FileText, Calendar } from "lucide-react";
import Button from "../../components/uiElement/Button";

const Prescriptions = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.prescription);

  const appointment = location.state?.appointment;

  const [formData, setFormData] = useState({
    appointmentId: id,
    diagnosis: appointment?.symptoms || "",
    advice: "",
    followUpDate: "",
    medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
    attachments: []
  });

  const handleAddMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: "", dosage: "", frequency: "", duration: "" }]
    });
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index][field] = value;
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPrescription(formData)).then((res) => {
      if (!res.error) navigate("/appointments");
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-full mx-auto">
        <button onClick={() => navigate(-1)} className="cursor-pointer flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Appointments
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Stethoscope size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800">Write Prescription</h1>
                <p className="text-slate-400 font-medium">Patient: <span className="text-slate-700">{appointment?.patient?.name}</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Diagnosis / Symptoms</label>
                <textarea
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none min-h-[100px]"
                  placeholder="Describe the diagnosis..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Medicines Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Pill className="text-indigo-500" size={20} /> Medicines
              </h3>
              <button 
                type="button"
                onClick={handleAddMedicine}
                className="flex items-center gap-1 text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
              >
                <Plus size={14} /> Add Medicine
              </button>
            </div>

            <div className="space-y-4">
              {formData.medicines.map((med, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl relative border border-slate-100">
                  <input
                    placeholder="Medicine Name"
                    className="p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    value={med.name}
                    onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                    required
                  />
                  <input
                    placeholder="Dosage (e.g. 500mg)"
                    className="p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    value={med.dosage}
                    onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                  />
                  <input
                    placeholder="Frequency"
                    className="p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    value={med.frequency}
                    onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="Duration"
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      value={med.duration}
                      onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                    />
                    {formData.medicines.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveMedicine(index)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice & Follow-up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="text-indigo-500" size={18} /> Additional Advice
              </h3>
              <textarea
                value={formData.advice}
                onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none min-h-[100px]"
                placeholder="e.g. Take rest, avoid cold water..."
              />
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="text-indigo-500" size={18} /> Follow-up Date
              </h3>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
              />
              <div className="mt-8">
                <Button 
                  variant="primary" 
                  fullWidth 
                  icon={Save} 
                  loading={loading}
                  type="submit"
                >
                  Save Prescription
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prescriptions;