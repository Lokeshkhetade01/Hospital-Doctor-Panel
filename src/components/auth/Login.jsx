import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/auth/authSlice";
import { 
  Mail, Lock, Eye, EyeOff, Loader2, 
  Stethoscope, ShieldCheck, ArrowRight, Activity 
} from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state se data nikalna
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Agar login successful ho jaye aur token aa jaye toh navigate karein
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#090A0D] flex items-center justify-center p-4 font-sans selection:bg-blue-500/30">
      
      {/* --- Animated Background Elements --- */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-600/15 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[460px] relative"
      >
        {/* Branding Section */}
        <div className="flex flex-col items-center mb-4">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.05 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-[24px] flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/30 relative"
          >
            <Stethoscope className="text-white" size={40} />
            <motion.div 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute -top-1 -right-1"
            >
              <Activity className="text-blue-200" size={20} />
            </motion.div>
          </motion.div>
          
          <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">
            Med<span className="text-blue-500 not-italic font-extralight tracking-normal">Care</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[4px] mt-2">Doctor Panel</p>
        </div>

        {/* Card */}
        <div className="bg-[#12141C]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white">Welcome, Doctor</h2>
              {error && <p className="text-red-500 text-xs mt-2 font-bold uppercase">{error}</p>}
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 tracking-[2px] ml-1"> Email</label>
                <div className={`relative transition-all duration-300 rounded-2xl border ${isFocused === 'email' ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-white/5 bg-[#0A0B10]'}`}>
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${isFocused === 'email' ? 'text-blue-500' : 'text-gray-600'}`}>
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused('')}
                    placeholder="dr.smith@hospital.com"
                    className="w-full bg-transparent text-white pl-12 pr-4 py-4 rounded-2xl outline-none transition-all placeholder:text-gray-700 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-gray-500 tracking-[2px]">Password</label>
                </div>
                <div className={`relative transition-all duration-300 rounded-2xl border ${isFocused === 'password' ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-white/5 bg-[#0A0B10]'}`}>
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${isFocused === 'password' ? 'text-blue-500' : 'text-gray-600'}`}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused('')}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-white pl-12 pr-12 py-4 rounded-2xl outline-none transition-all placeholder:text-gray-700 text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative group overflow-hidden rounded-2xl bg-blue-600 py-4 font-black text-white text-sm tracking-widest transition-all hover:bg-blue-500 flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    LOGIN
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;