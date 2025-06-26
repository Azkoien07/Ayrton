"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: React.ElementType;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  icon: Icon, 
  error, 
  disabled = false,
  placeholder 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2 text-light-text">
        {Icon && <Icon size={16} />}
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
            error 
              ? 'border-light-error focus:ring-red-200' 
              : 'border-light-border focus:ring-blue-200'
          } ${disabled ? 'bg-light-accentSoft cursor-not-allowed' : 'bg-light-card'}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary hover:text-light-text"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <motion.div 
          className="flex items-center gap-2 text-sm text-light-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={16} />
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default FormField;
