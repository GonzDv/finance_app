import { MoreVertical, Edit2, Trash2, ArrowRightLeft } from 'lucide-react';
import { CATEGORY_ICONS, AVAILABLE_ICONS } from "@/constants/icons";

const MovementItem = ({ movement, onEdit, onDelete }) => {
    const category = movement.category || {};
    const IconComponent = CATEGORY_ICONS[category.icon] || CATEGORY_ICONS['Utensils'];
    const iconConfig = AVAILABLE_ICONS.find(i => i.id === category.icon);
    const colorClass = iconConfig ? iconConfig.colorClass : 'text-gray-400 border-gray-400';

    const amountColors = {
        expense: 'text-red-400',
        transfer: 'text-blue-400',
        income: 'text-emerald-400'
    };
    const infroTransfer = movement.type === "transfer" ? `Transferencia entre ${movement.account?.name} y ${movement.destinationAccount?.name}` : "";

    return (
        <div className="grid grid-cols-[1.5fr_1fr_0.2fr] gap-4 items-center px-6 py-4 hover:bg-white/2 transition-colors group">
            <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center ${movement.type === "transfer"
                        ? `bg-zinc-800 border border${colorClass.split(' ')[0]} text-yellow-500`
                        : `bg-white/5 border ${colorClass.split(' ')[0]}`
                    }`}>
                    {movement.type === "transfer"
                        ? <ArrowRightLeft size={22} />
                        : <IconComponent size={22} className={colorClass} />
                    }
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                        {movement.description}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                        {category.name || infroTransfer}
                    </p>
                </div>
            </div>

            <div className="text-right">
                <span className={`text-sm font-bold ${amountColors[movement.type] || 'text-white'}`}>
                    {movement.type === "expense" ? '-' : '+'}
                    ${Math.abs(movement.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
            </div>

            <div className="relative group/menu flex justify-end">
                <button className="p-1.5 text-gray-600 hover:text-white hover:bg-white/5 rounded-full transition-all">
                    <MoreVertical size={16} />
                </button>

                <div className=" absolute bottom-full right-0 mb-2 w-36 bg-[#2a2a2a] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50 overflow-hidden">
                    <button
                        onClick={() => onEdit?.(movement)}
                        className="w-full flex items-center gap-2 px-4 py-3 text-xs text-gray-300 hover:bg-white/5 transition-colors"
                    >
                        <Edit2 size={12} /> Editar
                    </button>
                    <button
                        onClick={() => onDelete?.(movement._id)}
                        className="w-full flex items-center gap-2 px-4 py-3 text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                    >
                        <Trash2 size={12} /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovementItem;