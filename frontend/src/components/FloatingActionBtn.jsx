
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingActionButton = () => {
  return (
    <Link
      to="/new-movement"
      className="fixed bottom-24 right-6 bg-white text-black p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center border border-gray-200"
    >
      <Plus size={28} strokeWidth={2.5} />
    </Link>
  );
};

export default FloatingActionButton;