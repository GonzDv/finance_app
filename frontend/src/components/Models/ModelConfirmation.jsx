import { useFinance } from "../../context/FinanceContext";
import { X } from "lucide-react";
import { useState } from "react";

const Modal = ({ isOpen, onClose, title, Id, Name }) => {
  const { deleteCategory, deleteTransaction } = useFinance();
  const [isDeleting, setIsDeleting] = useState(false); 

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteCategory(Id);
      await deleteTransaction(Id);
      onClose(); 
    } catch (error) {
      alert("No se pudo eliminar la categoría");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-[2.5rem] bg-[#121212] border border-white/5 p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        
        <p className="text-sm text-zinc-400 leading-relaxed">
          ¿Estás seguro de que deseas eliminar <span className="text-white font-semibold">{Name}</span>? 
          Esta acción borrará todos los datos asociados.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            disabled={isDeleting}
            onClick={onClose}
            className="flex-1 px-6 py-4 rounded-2xl bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            disabled={isDeleting}
            onClick={handleConfirm}
            className="flex-1 px-6 py-4 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all active:scale-95 shadow-[0_0_20px_rgba(239,68,68,0.2)] disabled:brightness-75"
          >
            {isDeleting ? "Eliminando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;