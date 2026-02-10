import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { CATEGORY_ICONS, AVAILABLE_ICONS } from "@/constants/icons";
import { useState, useRef, useEffect } from 'react';

const CategoryItem = ({ category, onEdit, onDeleteClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Lógica para cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Configuración de Icono (Reutilizando tu lógica de MovementItem)
    const IconComponent = CATEGORY_ICONS[category.icon] || CATEGORY_ICONS['Utensils'];
    const iconConfig = AVAILABLE_ICONS.find(i => i.id === category.icon);
    const colorClass = iconConfig ? iconConfig.colorClass : 'text-zinc-400 border-zinc-400';

    return (
        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.2fr] gap-4 items-center px-8 py-5 hover:bg-white/2 transition-colors group" ref={menuRef}>
            {/* 1. Categoría e Icono */}
            <div className="flex items-center gap-4 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center bg-white/5 border ${colorClass.split(' ')[0]}`}>
                    <IconComponent size={20} className={colorClass} />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-100 truncate uppercase tracking-tight">
                        {category.name}
                    </p>
                    <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">
                        Presupuesto Activo
                    </p>
                </div>
            </div>

            {/* 2. Gasto Actual */}
            <div className="text-center">
                <span className="text-sm font-black text-white tracking-tighter">
                    ${category.spent?.toLocaleString('es-MX', { minimumFractionDigits: 2 }) || '0.00'}
                </span>
            </div>

            {/* 3. Límite/Presupuesto */}
            <div className="text-center">
                <span className="text-sm font-bold text-zinc-500 tracking-tighter">
                    ${category.budget?.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
            </div>

            {/* 4. Menú de Opciones (Mismo estilo que MovementItem) */}
            <div className="relative flex justify-end">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`p-1.5 rounded-full transition-all ${isOpen ? 'bg-white/10 text-white' : 'text-zinc-600 hover:text-white'}`}
                >
                    <MoreVertical size={16} />
                </button>

                <div className={`absolute bottom-full right-0 mb-2 w-36 bg-[#1c1c1c] border border-white/10 rounded-2xl shadow-2xl transition-all z-50 overflow-hidden
                    ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                    <button
                        onClick={() => { onEdit?.(category); setIsOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase text-zinc-300 hover:bg-white/5 transition-colors"
                    >
                        <Edit2 size={12} /> Editar
                    </button>
                    <button
                        onClick={() => { onDeleteClick?.(category); setIsOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                    >
                        <Trash2 size={12} /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;