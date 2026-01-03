import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import api from '@/api/axios';
import { ArrowLeft, Plus, Utensils, Car, ShoppingBag, HeartPulse, Pizza, Shirt } from "lucide-react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/categories');
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.error('Error al obtener las cuentas:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, [])
    const handleIconChange = (iconName) => {
        switch (iconName) {
            case 'Utensils':
                return <Utensils />;
            case 'Car':
                return <Car />;
            case 'ShoppingBag':
                return <ShoppingBag />;
            case 'HeartPulse':
                return <HeartPulse />;
            case 'Pizza':
                return <Pizza />;
            case 'Shirt':
                return <Shirt />;
            default:
                return categories.icon;
        }
    }
    console.log(...categories);
    if (loading) {
        return <div className='text-gray-500 text-sm'>Cargando categorias...</div>;
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories(categories.filter(category => category._id !== id));
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
        }
    };

    const handleEdit = (category) => {
        // Lógica para editar la categoría
        console.log('Editar categoría:', category);
    };
    return (
<>
      <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800">

        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.2fr] gap-2 px-6 py-4 border-b border-gray-800 bg-[#121212]/50">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Categoría</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center">Gastado</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center">Presupuesto</span>
          <span className="w-4"></span>
        </div>


        <div className="divide-y divide-gray-800">
          {categories.map((category) => (
            <div
              key={category._id}
              className="grid grid-cols-[1.5fr_1fr_1fr_0.2fr] gap-2 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
                  {handleIconChange(category.icon)}
                </div>
                <p className="text-sm font-semibold text-white truncate">
                  {category.name}
                </p>
              </div>

              <div className="text-center">
                <span className="text-sm font-medium text-red-400">
                  ${category.spent?.toLocaleString() || '0.00'}
                </span>
              </div>

              <div className="text-center">
                <span className="text-sm font-medium text-gray-400">
                  ${category.budget?.toLocaleString() || '0.00'}
                </span>
              </div>

              
              <div className="relative group/menu flex justify-end">
                <button className="p-1 text-gray-600 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>

                <div className="absolute bottom-full right-0 mb-2 w-32 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50">
                  <button 
                    onClick={() => handleEdit(category)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <Edit2 size={12} /> Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(category._id)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                  >
                    <Trash2 size={12} /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para añadir nueva categoría al final de la lista */}
        <Link
          to="/new-category"
          className="flex items-center justify-center gap-2 w-full py-4 text-gray-500 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all border-t border-gray-800 group"
        >
          <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Añadir Categoría</span>
        </Link>
      </div>    
    </>

    )
}
export default CategoryList;