import { useFinance } from "../../context/FinanceContext";
import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children, categoryId }) => {
  const { deleteCategory } = useFinance();


  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        console.log('Escape pressed');
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
      
    }
    return () => { 
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEsc)
      ;};
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-[#121212] border border-white/5 p-8 shadow-2xl transition-all animate-in fade-in zoom-in duration-300">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-zinc-400">
          {children}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 rounded-2xl bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-all active:scale-95"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              deleteCategory(categoryId);
              onClose();
            }}
            className="flex-1 px-6 py-4 rounded-2xl text-white bg-red-500 font-bold hover:bg-red-600  transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;