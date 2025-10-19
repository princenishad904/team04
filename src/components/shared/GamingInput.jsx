export const GamingInput = ({ label, name, value, onChange, placeholder = '',require =true }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-semibold text-cyan-400 mb-1 uppercase tracking-wider">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-gray-800 text-white border border-cyan-500 rounded-lg shadow-inner-cyan focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300 placeholder-gray-500 font-mono text-sm"
      
      required={require}
     
    />
  </div>
);