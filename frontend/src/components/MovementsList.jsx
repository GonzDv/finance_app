import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovementItem from "./MovementItem";
import Modal from './Models/ModelConfirmation';
import { useState } from 'react';
const MovementsList = ({ transactions, loading, onEdit }) => {
    const [movementToDelete, setMovementToDelete] = useState(null);
    if (loading) {
        return (
            <div className="w-full flex justify-center p-10">
                <p className="text-zinc-500 animate-pulse">Cargando datos...</p>
            </div>
        );
    }

    return (
        <section className="w-full max-w-4xl mx-auto mt-6">
            <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 shadow-2xl">

                <div className="grid grid-cols-[1.5fr_1fr_0.2fr] gap-4 px-6 py-4 bg-[#121212]/50 border-b border-gray-800">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                        Descripción movimiento
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-right">
                        Monto
                    </span>
                    <span className="w-4"></span>
                </div>

                <div className="divide-y divide-gray-800/50">
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
                        <div className="p-10 text-center text-gray-500 text-sm italic">
                            No hay movimientos registrados.
                        </div>
                    )}
                    <Modal
                        isOpen={!!movementToDelete}
                        onClose={() => setMovementToDelete(null)}
                        title="Confirmar Eliminación"
                        Id={movementToDelete?._id}
                        Name={movementToDelete?.description}
                    >
                        <p className="text-sm text-gray-300">
                            ¿Estás seguro de que deseas eliminar el movimiento 
                            <span className="font-semibold text-white"> {movementToDelete?.description}</span>?
                        </p>
                    </Modal>

                </div>
                <Link
                    to="/new-movement"
                    className="flex items-center justify-center gap-2 w-full py-4 text-gray-500 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all border-t border-gray-800 group"
                >
                    <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Añadir Movimiento</span>
                </Link>
            </div>
        </section>
    );
}

export default MovementsList;