const Buttom = ({ children, onClick, type = "button", className = "" }) => {
    className = "w-full bg-[#3cb566] text-white py-4 rounded-xl font-bold  active:scale-[0.98] transition-all shadow-lg shadow-green-500/50 hover:shadow-green-500/40";
  return (
    <button
      type={type}
      className={`${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Buttom;