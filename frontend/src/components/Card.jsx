
const FormSection = ({ children, className = "" }) => {
  return (
    <div 
      className={`min-w-40  bg-[#1E1E1E] p-2 rounded-xl border border-gray-800 flex flex-col justify-between scrollbar-hide ${className}`}
    >
      {children}
    </div>
  );
};

export default FormSection;