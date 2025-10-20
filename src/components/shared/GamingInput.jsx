import React from 'react';

export const GamingInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = true,
  type = "text"
}) => {
  return (
    <div className="mb-4">
      <label className="block text-cyan-300 text-sm font-bold mb-2 uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-gray-800 border-2 border-cyan-500 rounded-lg py-3 px-4 text-white placeholder-gray-400 
                     focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300
                     hover:border-cyan-400"
        />
        <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 pointer-events-none"></div>
      </div>
    </div>
  );
};