import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus, History, ArrowRight } from "lucide-react";
import Modal from "./Models/ModelConfirmation";
import CategoryItem from "./CategoryItem";
import Skeleton from "./Skeleton";

const CategoryList = ({ categories, onEdit, loading }) => {
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    if (loading) return (
        <section className="w-full max-w-4xl mx-auto mt-10 px-4">
            <div className="flex gap-3 mb-6 px-4"><Skeleton className="w-48 h-4" /></div>
            <div className="bg-[#121212] rounded-[2.5rem] h-64 animate-pulse" />
        </section>
    );

    return (
        <section className="w-full max-w-4xl mx-auto mt-10 px-4 pb-20">
            {/* Header de Sección Estilo Apple (Igual que MovementList) */}
            <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500">
                        Límites de Gastos
                    </h3>
                </div>
                <Link to="/categories" className="text-[10px] font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-widest flex items-center gap-1.5 group">
                    Gestionar <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
                
                {/* Cabecera de Tabla (Misma estructura que MovementList) */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_0.2fr] gap-4 px-8 py-5 bg-white/1 border-b border-white/5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black">
                        Categoría
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black text-center">
                        Consumido
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black text-center">
                        Meta Mensual
                    </span>
                    <span className="w-4"></span>
                </div>

                {/* Lista de Categorías Reutilizando el Item */}
                <div className="divide-y divide-white/3">
                    {categories?.length > 0 ? (
                        categories.map((category) => (
                            <CategoryItem
                                key={category._id}
                                category={category}
                                onEdit={onEdit}
                                onDeleteClick={(cat) => setCategoryToDelete(cat)}
                            />
                        ))
                    ) : (
                        <div className="p-20 text-center text-zinc-600 text-[10px] font-black uppercase tracking-widest italic">
                            No hay categorías configuradas
                        </div>
                    )}
                </div>

                <Link
                    to="/new-category"
                    className="flex items-center justify-center gap-3 w-full py-6 bg-white/1 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-400/3 transition-all border-t border-white/5 group"
                >
                    <div className="p-1.5 rounded-lg bg-zinc-900 group-hover:bg-emerald-500/20 group-hover:text-emerald-500 transition-colors">
                        <Plus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Registrar nueva categoría</span>
                </Link>
            </div>

            <Modal
                isOpen={!!categoryToDelete}
                onClose={() => setCategoryToDelete(null)}
                title="Eliminar Categoría"
                Id={categoryToDelete?._id}
                Name={categoryToDelete?.name}
            >
                <div className="space-y-4">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        ¿Estás seguro de que deseas eliminar la categoría 
                        <span className="font-black text-white px-1">"{categoryToDelete?.name}"</span>? 
                        Esto no borrará tus movimientos, pero quedarán sin categoría asignada.
                    </p>
                </div>
            </Modal>
        </section>
    );
};

export default CategoryList;