import { Plus, History, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovementItem from "./MovementItem";
import Modal from './Models/ModelConfirmation';
import { useState } from 'react';
import Skeleton from './Skeleton';

// --- ESQUELETO DE CARGA PARA LA LISTA ---
const MovementSkeleton = () => (
    <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-[1.5fr_1fr_0.2fr] gap-4 items-center px-8 py-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
                    <div className="space-y-2 w-full">
                        <Skeleton className="w-3/4 h-4" />
                        <Skeleton className="w-1/2 h-2" />
                    </div>
                </div>
                <div className="flex justify-end"><Skeleton className="w-20 h-6" /></div>
                <div className="flex justify-end"><Skeleton className="w-4 h-4 rounded-full" /></div>
            </div>
        ))}
    </div>
);

const MovementsList = ({ transactions, loading, onEdit }) => {
    const [movementToDelete, setMovementToDelete] = useState(null);

    if (loading) return (
        <section className="w-full max-w-4xl mx-auto mt-10 px-4">
            <div className="flex items-center gap-3 mb-6 px-2">
                <Skeleton className="w-48 h-4" />
            </div>
            <MovementSkeleton />
        </section>
    );

    return (
        <section className="w-full max-w-4xl mx-auto mt-10 px-4 pb-20">
            {/* Header de Sección Estilo Apple */}
            <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-zinc-700 rounded-full" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500">
                        Historial Reciente
                    </h3>
                </div>
                <Link to="/history" className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1.5 group">
                    Ver todo <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
                
                {/* Cabecera de Tabla Minimalista */}
                <div className="grid grid-cols-[1.5fr_1fr_0.2fr] gap-4 px-8 py-5 bg-white/2 border-b border-white/5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black">
                        Detalle del movimiento
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-black text-right">
                        Monto Neto
                    </span>
                    <span className="w-4"></span>
                </div>

                {/* Lista de Movimientos */}
                <div className="divide-y divide-white/3">
                    {transactions.length > 0 ? (
                        transactions.map((movement) => (
                            <MovementItem
                                key={movement._id}
                                movement={movement}
                                onEdit={onEdit}
                                onDeleteClick={(mov) => setMovementToDelete(mov)}
                            />
                        ))
                    ) : (
                        <div className="p-20 text-center flex flex-col items-center gap-4">
                            <div className="p-4 bg-zinc-900 rounded-full text-zinc-800">
                                <History size={32} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">
                                No hay actividad registrada aún
                            </p>
                        </div>
                    )}
                </div>

                <Link
                    to="/new-movement"
                    className="flex items-center justify-center gap-3 w-full py-6 bg-white/1 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-400/3 transition-all border-t border-white/5 group"
                >
                    <div className="p-1.5 rounded-lg bg-zinc-900 group-hover:bg-emerald-500/20 group-hover:text-emerald-500 transition-colors">
                        <Plus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Registrar nuevo movimiento</span>
                </Link>
            </div>

            <Modal
                isOpen={!!movementToDelete}
                onClose={() => setMovementToDelete(null)}
                title="Eliminar Transacción"
                Id={movementToDelete?._id}
                Name={movementToDelete?.description}
            >
                <div className="space-y-4">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        ¿Estás seguro de que deseas eliminar este registro? Esta acción actualizará automáticamente el balance de tus cuentas.
                    </p>
                    <div className="p-4 bg-zinc-900 rounded-2xl border border-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-zinc-500 uppercase">{movementToDelete?.description}</span>
                        <span className="text-sm font-black text-white">${movementToDelete?.amount.toLocaleString('es-MX')}</span>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

export default MovementsList;