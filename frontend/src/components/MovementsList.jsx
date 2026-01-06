import { useState, useEffect } from "react";
import api from '@/api/axios';
import { CreditCard, Plus, MoreVertical, Edit2, Trash2, ArrowRightLeft, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

const MovementsList = () => {
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovements = async () => {
            try {
                const { data } = await api.get('/transaction');
                setMovements(data);
            } catch (error) {
                console.error('Error al obtener los movimientos:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovements();
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center p-10">
                <div className="animate-pulse text-gray-500 text-sm">Cargando movimientos...</div>
            </div>
        );
    }

    return (
        <section className="w-full max-w-4xl mx-auto mt-6">
            <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">

                {/* Encabezado de la Tabla */}
                <div className="grid grid-cols-[1.5fr_1fr_0.2fr] gap-4 px-6 py-4 bg-[#121212]/50 border-b border-gray-800">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Descripción movimiento</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-right">Monto</span>
                    <span className="w-4"></span>
                </div>

                {/* Lista de Movimientos */}
                <div className="divide-y divide-gray-800/50">
                    {movements.length > 0 ? (
                        movements.map((movement) => (
                            <div
                                key={movement._id}
                                className="grid grid-cols-[1.5fr_1fr_0.2fr] gap-4 items-center px-6 py-4 hover:bg-white/2 transition-colors group"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className={`p-2.5 bg-blue-500/10 rounded-xl ${movement.type === "transfer" ? 'bg-yellow-500/10 text-yellow-500' : movement.account?.color}`}>
                                        {movement.type === "transfer" ? <ArrowRightLeft /> : <CreditCard />}
                                    </div>
                                    <p className="text-sm font-semibold text-white truncate">
                                        {movement.description}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span className={`text-sm font-bold ${movement.type == "expense" ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {movement.type == "expense" ? '-' : '+'}
                                        ${Math.abs(movement.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <div className="relative group/menu flex justify-end">
                                    <button className="p-1.5 text-gray-600 hover:text-white hover:bg-white/5 rounded-full transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                    <div className="absolute bottom-full right-0 mb-2 w-36 bg-[#2a2a2a] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50 overflow-hidden">
                                        <button className="w-full flex items-center gap-2 px-4 py-3 text-xs text-gray-300 hover:bg-white/5 transition-colors">
                                            <Edit2 size={12} /> Editar
                                        </button>
                                        <button className="w-full flex items-center gap-2 px-4 py-3 text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5">
                                            <Trash2 size={12} /> Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-10 text-center text-gray-500 text-sm">No hay movimientos registrados.</div>
                    )}
                </div>

                <Link
                    to="/new-account"
                    className="flex items-center justify-center gap-2 w-full py-5 text-gray-500 hover:text-white hover:bg-white/2 transition-all border-t border-gray-800 group"
                >
                    <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Registrar Nuevo</span>
                </Link>
            </div>
        </section>

    );
}

export default MovementsList;