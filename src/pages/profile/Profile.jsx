import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorProfile,
  updateDoctorProfile,
} from "../../redux/slices/profile/profileSlice";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Stethoscope,
  Briefcase,
  IndianRupee,
  Info,
  Save,
  X,
  Loader2,
  Camera,
  Edit,
} from "lucide-react";
import Button from "../../components/uiElement/Button";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, updateLoading } = useSelector(
    (state) => state.profile,
  );

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchDoctorProfile());
  }, [dispatch]);

  // Sync local state with Redux state
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user?.name || "",
        phone: user.user?.phone || "",
        specialization: user.specialization || "",
        experience: user.experience || "",
        fees: user.fees || "",
        about: user.about || "",
        hospital: user.hospital || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const result = await dispatch(updateDoctorProfile(formData));
    if (result.meta.requestStatus === "fulfilled") {
      setIsEdit(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800">My Profile</h1>
            <p className="text-slate-500 text-sm font-medium">
              Update your professional information
            </p>
          </div>
          {!isEdit ? (
            <Button
              onClick={() => setIsEdit(true)}
              icon={Edit}
              variant="primary"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button onClick={() => setIsEdit(false)} variant="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="primary"
                icon={Save}
                loading={updateLoading} 
                className="bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100" // Custom color 
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Avatar & Basic Info */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <span className="px-5 py-3 bg-blue-300 rounded-xl flex justify-center items-center">
                <h2 className="text-3xl font-black text-slate-800">
                  {user.user?.name[0]}
                </h2>
              </span>
              {isEdit && (
                <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={24} />
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEdit ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-2xl font-black text-slate-800 border-b-2 border-indigo-200 focus:outline-none focus:border-indigo-600 bg-transparent w-full mb-2"
                />
              ) : (
                <h2 className="text-3xl font-black text-slate-800">
                  {user.user.name}
                </h2>
              )}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                  <Mail size={14} /> {user.user.email}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                  <Phone size={14} /> {user.user.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Professional Info */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4">
                <Stethoscope className="text-indigo-600" size={20} />{" "}
                Professional Info
              </h3>

              <InputField
                label="Specialization"
                name="specialization"
                value={formData.specialization}
                isEdit={isEdit}
                onChange={handleChange}
                icon={<Stethoscope size={16} />}
              />
              <InputField
                label="Experience (Years)"
                name="experience"
                type="number"
                value={formData.experience}
                isEdit={isEdit}
                onChange={handleChange}
                icon={<Briefcase size={16} />}
              />
              <InputField
                label="Consultation Fees (₹)"
                name="fees"
                type="number"
                value={formData.fees}
                isEdit={isEdit}
                onChange={handleChange}
                icon={<IndianRupee size={16} />}
              />
            </div>

            {/* Workplace Info */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4">
                <Building2 className="text-indigo-600" size={20} /> Workplace
                Details
              </h3>

              <InputField
                label="Hospital Name"
                name="hospital"
                value={formData.hospital}
                isEdit={isEdit}
                onChange={handleChange}
                icon={<Building2 size={16} />}
              />
              <InputField
                label="City"
                name="city"
                value={formData.city}
                isEdit={isEdit}
                onChange={handleChange}
                icon={<MapPin size={16} />}
              />
            </div>

            {/* About / Bio */}
            <div className="md:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4">
                <Info className="text-indigo-600" size={20} /> About Me
              </h3>
              {isEdit ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none font-medium"
                />
              ) : (
                <p className="text-slate-600 font-medium leading-relaxed">
                  {user.about || "No bio added yet."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Form Fields
const InputField = ({
  label,
  name,
  value,
  isEdit,
  onChange,
  icon,
  type = "text",
}) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div
      className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isEdit ? "bg-slate-50 border border-indigo-100 ring-2 ring-indigo-500/5" : "bg-white border border-transparent"}`}
    >
      <div className="text-slate-400">{icon}</div>
      {isEdit ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="bg-transparent w-full text-sm font-bold text-slate-700 focus:outline-none"
        />
      ) : (
        <p className="text-sm font-bold text-slate-700">{value || "N/A"}</p>
      )}
    </div>
  </div>
);

export default Profile;
