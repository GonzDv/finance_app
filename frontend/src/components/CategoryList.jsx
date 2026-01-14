import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Modal from "./Models/ModelConfirmation";
import CategoryItem from "./CategoryItem";

const CategoryList = ({ categories, onEdit, loading }) => {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const handleEdit = (category) => {
    console.log('Editar categoría:', category);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center p-10">
        <p className="text-zinc-500 animate-pulse">Cargando datos...</p>
      </div>
    );
  }
  return (
    <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 shadow-xl">

      <div className="grid grid-cols-[1.5fr_1fr_1fr_0.2fr] gap-2 px-6 py-4 border-b border-gray-800 bg-[#121212]/50">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Categoría</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center">Gastado</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center">Presupuesto</span>
        <span className="w-4"></span>
      </div>

      <div className="divide-y divide-gray-800">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            onEdit={onEdit}
            onDeleteClick={(cat) => setCategoryToDelete(cat)}
          />
        ))}

        <Modal
          isOpen={!!categoryToDelete}
          onClose={() => setCategoryToDelete(null)}
          title="Confirmar Eliminación"
          Id={categoryToDelete?._id}
          Name={categoryToDelete?.name}
        >
          <p className="text-sm text-gray-300">
            ¿Estás seguro de que deseas eliminar la categoría 
            <span className="font-semibold text-white"> {categoryToDelete?.name}</span>?
          </p>
        </Modal>
      </div>

      <Link
        to="/new-category"
        className="flex items-center justify-center gap-2 w-full py-4 text-gray-500 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all border-t border-gray-800 group"
      >
        <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Añadir Categoría</span>
      </Link>
    </div>
  );
}

export default CategoryList;