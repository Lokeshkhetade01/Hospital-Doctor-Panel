import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  size = "md", 
  className = "", 
  loading = false, 
  icon: Icon, 
  disabled = false, 
  ...props 
}) => {
  
  // Base styles for all buttons
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-xl focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  // Variant styles
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100",
    secondary: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm",
    outline: "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800",
  };

  // Size styles
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}

      {/* Icon (if provided) and not loading */}
      {!loading && Icon && (
        <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />
      )}

      {/* Button Text */}
      {children}
    </button>
  );
};

export default Button;