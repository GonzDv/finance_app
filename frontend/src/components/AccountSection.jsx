import { useState, useRef, useEffect } from 'react';
import { CreditCard, Plus, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useSpring, useTransform } from "framer-motion";
import Skeleton from './Skeleton';

// --- COMPONENTE ANIMATED NUMBER (Reutilizado para coherencia) ---
const AnimatedNumber = ({ value, decimals = 2 }) => {
    let spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    let displayValue = useTransform(spring, (current) => 
        current.toLocaleString('es-MX', { 
            minimumFractionDigits: decimals, 
            maximumFractionDigits: decimals 
        })
    );
    useEffect(() => { spring.set(value); }, [spring, value]);
    return <motion.span>{displayValue}</motion.span>;
}

// --- ESQUELETO DE CARGA PREMIUM ---
const AccountSkeleton = () => (
    <div className="flex gap-6 overflow-hidden px-1">
        {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-70 h-44 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 p-6 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-2xl" />
                    <Skeleton className="w-28 h-4" />
                </div>
                <div>
                    <Skeleton className="w-20 h-2 mb-3" />
                    <Skeleton className="w-40 h-10" />
                </div>
            </div>
        ))}
    </div>
);

// --- TARJETA INDIVIDUAL ESTILO APPLE WALLET ---
const AccountCard = ({ account, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div 
                ref={menuRef} 
                className="relative min-w-70 h-44 bg-linear-to-br from-[#121212] to-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-7 flex flex-col justify-between shadow-2xl transition-all hover:border-white/10 group overflow-hidden"
            >
                {/* Glow Dinámico de Fondo (Más sutil) */}
                <div 
                    className="absolute -top-24 -right-24 w-56 h-56 opacity-[0.08] blur-[80px] rounded-full transition-opacity group-hover:opacity-15 pointer-events-none"
                    style={{ backgroundColor: account.color || '#3b82f6' }}
                />

                <div className="relative z-10 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div 
                            className="p-3 rounded-[1.25rem] bg-white/5 border border-white/10 shadow-inner flex items-center justify-center" 
                            style={{ color: account.color || '#3b82f6' }}
                        >
                            <CreditCard size={22} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 italic">
                            {account.name}
                        </span>
                    </div>

                    <button 
                        onClick={() => setIsOpen(true)}
                        className="p-2 text-zinc-700 hover:text-white transition-colors active:scale-90"
                    >
                        <MoreVertical size={20} />
                    </button>
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1.5">Saldo Disponible</p>
                    <h2 className="text-3xl font-black text-white tracking-tighter flex items-baseline">
                        <span className="text-zinc-500 text-xl font-medium mr-2">$</span>
                        <AnimatedNumber value={account.balance} />
                    </h2>
                </div>
            </div>

            {/* --- BOTTOM SHEET (Mobile First) --- */}
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center p-0 sm:p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />
                    
                    <div className="relative w-full max-w-sm bg-[#111111] rounded-t-[3rem] sm:rounded-[3rem] border-t sm:border border-white/10 p-10 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-10 sm:hidden" />
                        
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-white font-black uppercase tracking-tighter text-xl italic">Gestionar Cuenta</h3>
                            <button onClick={() => setIsOpen(false)} className="p-2 bg-zinc-900 rounded-full text-zinc-500"><X size={18} /></button>
                        </div>

                        <div className="space-y-4">
                            <button 
                                onClick={() => { onEdit(account); setIsOpen(false); }}
                                className="w-full flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/50 text-white font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-[0.98] border border-white/5"
                            >
                                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Edit2 size={16} /></div>
                                Editar Detalles
                            </button>
                            <button 
                                onClick={() => { onDelete(account); setIsOpen(false); }}
                                className="w-full flex items-center gap-4 p-5 rounded-2xl bg-red-500/10 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500/20 transition-all active:scale-[0.98] border border-red-500/10"
                            >
                                <div className="p-2 bg-red-500/20 text-red-500 rounded-lg"><Trash2 size={16} /></div>
                                Eliminar Cuenta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const AccountSection = ({ accounts, loading, onEdit, onDelete }) => {
    return (
        <section className="w-full mt-8">
            <div className="flex overflow-x-auto gap-6 no-scrollbar pb-10 px-4 scroll-smooth">
                {loading ? (
                    <AccountSkeleton />
                ) : (
                    accounts.map((account) => (
                        <AccountCard key={account._id} account={account} onEdit={onEdit} onDelete={onDelete} />
                    ))
                )}
                
                {/* Botón Añadir con Estilo Glass Dashed */}
                <Link 
                    to="/new-account"
                    className="min-w-30 h-44 border-2 border-dashed border-zinc-800/50 rounded-[2.5rem] flex flex-col items-center justify-center text-zinc-700 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/2 transition-all duration-300 group shrink-0"
                >
                    <div className="p-3 bg-zinc-900/50 rounded-2xl mb-2 group-hover:scale-110 transition-transform">
                        <Plus size={28} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Nueva</span>
                </Link>
            </div>
        </section>
    );
};

export default AccountSection;