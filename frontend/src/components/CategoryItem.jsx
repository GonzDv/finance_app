
import { MoreVertical, Edit2, Trash2, Plus } from "lucide-react";
import { CATEGORY_ICONS, AVAILABLE_ICONS } from "@/constants/icons";

const CategoryItem = ({ category, onEdit, loading, onDeleteClick }) => {
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
    const IconComponent = CATEGORY_ICONS[category.icon] || CATEGORY_ICONS['Utensils'];
    const iconConfig = AVAILABLE_ICONS.find(i => i.id === category.icon);
    const colorClass = iconConfig ? iconConfig.colorClass : 'text-gray-400 border-gray-400';
    return (
        <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 shadow-xl">

            <div className="divide-y divide-gray-800">
                <div
                    key={category._id}
                    className="grid grid-cols-[1.5fr_1fr_1fr_0.2fr] gap-2 items-center px-6 py-4 hover:bg-white-2 transition-colors group"
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-xl shrink-0 bg-white/5 border ${colorClass.split(' ')[0]}`}>
                            <IconComponent size={22} className={`${colorClass}`} />
                        </div>
                        <p className="text-sm font-semibold text-white truncate">
                            {category.name}
                        </p>
                    </div>

                    <div className="text-center">
                        <span className="text-sm font-medium text-red-400/80">
                            ${category.spent?.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="text-center">
                        <span className="text-sm font-medium text-gray-400">
                            ${category.budget?.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="relative group/menu flex justify-end">
                        <button className="p-1 text-gray-600 hover:text-white transition-colors">
                            <MoreVertical size={18} />
                        </button>
                        <div className="absolute bottom-full right-0 mb-2 w-32 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50 overflow-hidden">
                            <button className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-300 hover:bg-white/5 transition-colors">
                                <Edit2 size={12} /> Editar
                            </button>
                            <button
                                onClick={() => { onDeleteClick(category); }}
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                            >
                                <Trash2 size={12} /> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CategoryItem;