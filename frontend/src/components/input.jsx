const Input = ({label, type, name, value, onChange, placeholder, className }) => {
  return (
    <div className="w-full ">
      <label className="block text-m font-medium text-white">{label}</label>
      <input
        name={name}
        type={type}
        className= {`${className} w-full p-4 mt-1 bg-[#343e47] rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all`}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    </div>
  );
};
export default Input;