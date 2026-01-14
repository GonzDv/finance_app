import { useState } from 'react';
import { CreditCard, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccountSection = ({ accounts, loading, onEdit, onDelete }) => {
    // Corregimos la lógica: Si está cargando, mostrar el mensaje.
    if (loading) {
        return <div className='text-zinc-500 text-sm animate-pulse p-4'>Cargando tus cuentas...</div>;
    }

    return (
        <section className="w-full">
            <div className="flex overflow-x-auto gap-6 no-scrollbar pb-6 px-1 scroll-smooth">
                {accounts.map((account) => (
                    <div
                        key={account._id}
                        className="relative min-w-60 h-40 bg-zinc-900 rounded-4xl border border-white/5 p-5 flex flex-col justify-between shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-500"
                    >
                        <div 
                            className="absolute -top-20 -right-20 w-40 h-40 opacity-20 blur-[80px] rounded-full transition-opacity group-hover:opacity-40"
                            style={{ backgroundColor: account.color || '#3b82f6' }}
                        />

                        <div className="flex justify-between items-start z-10">
                            <div className="flex items-center gap-3">
                                <div 
                                    className="p-2.5 rounded-xl bg-white/5 border border-white/10"
                                    style={{ color: account.color || '#3b82f6' }}
                                >
                                    <CreditCard size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                    {account.name}
                                </span>
                            </div>

                            <div className="relative group/menu flex justify-end">
                                <button className="p-1.5 text-zinc-600 hover:text-white transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                                <div className="absolute bottom-full right-0 mb-2 w-32 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50 ">
                                    <button onClick={() => onEdit?.(account)} className="w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-bold uppercase text-zinc-300 hover:bg-white/5 transition-colors">
                                        <Edit2 size={12} /> Editar
                                    </button>
                                    <button onClick={() => onDelete?.(account)} className="w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-bold uppercase text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5">
                                        <Trash2 size={12} /> Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="z-10">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Balance total</p>
                            <p className="text-2xl font-bold text-white tracking-tighter">
                                <span className="text-zinc-500 mr-1.5 text-lg font-medium">$</span>
                                {account.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                ))}

                <Link 
                    to="/new-account"
                    className="min-w-30 h-40 border-2 border-dashed border-zinc-800 rounded-4xl flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 hover:bg-white/2 transition-all group shrink-0"
                >
                    <Plus size={32} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] font-black uppercase tracking-tighter mt-2">Nueva</span>
                </Link>
            </div>
        </section>
    );
};

export default AccountSection;