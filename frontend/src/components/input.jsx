const Input = ({label, type, name, value, onChange}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-white">{label}</label>
      <input
        name={name}
        type={type}
        className="w-full p-3 mt-1 bg-[#343e47] rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
export default Input;