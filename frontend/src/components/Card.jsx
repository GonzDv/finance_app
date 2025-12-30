
const Card = ({ children, className = "" }) => {
  return (
    <div 
      className={`bg-[#1E1E1E] p-5 rounded-2xl border border-gray-800 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;