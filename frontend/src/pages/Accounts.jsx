import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Wallet, ChevronRight } from "lucide-react";
import { useFinance } from '@/context/FinanceContext';
import Skeleton from '@/components/Skeleton';
import MovementItem from "@/components/MovementItem";

const Account = () => {
    const { accounts, transactions, loading } = useFinance();
    
    // 1. Estados para la interactividad
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [activeFilter, setActiveFilter] = useState('Todo');

    // 2. Inicializar con la primera cuenta disponible
    useEffect(() => {
        if (accounts?.length > 0 && !selectedAccountId) {
            setSelectedAccountId(accounts[0]._id);
        }
    }, [accounts, selectedAccountId]);

    // 3. Obtener la cuenta seleccionada actualmente
    const currentAccount = useMemo(() => 
        accounts?.find(acc => acc._id === selectedAccountId),
    [accounts, selectedAccountId]);

    // 4. Lógica de Filtrado de Movimientos (Segura contra errores)
    const displayMovements = useMemo(() => {
        if (!selectedAccountId || !transactions) return [];

        let filtered = transactions.filter(tx => 
            tx.accountId === selectedAccountId || tx.account?._id === selectedAccountId
        );

        if (activeFilter === 'Ingresos') filtered = filtered.filter(tx => tx.type === 'income');
        if (activeFilter === 'Gastos') filtered = filtered.filter(tx => tx.type === 'expense');

        return filtered.slice(-5).reverse();
    }, [selectedAccountId, transactions, activeFilter]);

    if (loading && !accounts?.length) {
        return (
            <div className="min-h-screen bg-[#09090b] p-6 space-y-8">
                <Skeleton className="w-48 h-10 rounded-2xl" />
                <div className="flex gap-4 overflow-hidden"><Skeleton className="min-w-70 h-40 rounded-[2.5rem]" /></div>
                <Skeleton className="w-full h-64 rounded-[2.5rem]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white pb-32">
            {/* --- HEADER --- */}
            <div className="p-6 md:p-12 max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="p-2.5 bg-zinc-900 rounded-2xl border border-white/5 hover:bg-zinc-800 transition-all">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-black tracking-tighter italic uppercase">Tus Cuentas</h1>
                    </div>
                    <Link to="/new-account" className="text-emerald-500 text-xs font-black uppercase tracking-widest hover:text-emerald-400">
                        Añadir Nueva
                    </Link>
                </header>

                {/* --- SLIDER HORIZONTAL DE CUENTAS --- */}
                <section className="mb-10">
                    <div className="flex gap-5 overflow-x-auto no-scrollbar px-1 pb-4">
                        {accounts?.map((acc) => (
                            <button
                                key={acc._id}
                                onClick={() => setSelectedAccountId(acc._id)}
                                className={`relative min-w-70 h-44 p-6 rounded-[2.5rem] border transition-all duration-500 flex flex-col justify-between text-left group
                                    ${selectedAccountId === acc._id 
                                        ? 'bg-zinc-900 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                                        : 'bg-zinc-900/40 border-white/5 opacity-60 hover:opacity-100'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10" style={{ color: acc.color }}>
                                        <Wallet size={24} />
                                    </div>
                                    {selectedAccountId === acc._id && (
                                        <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{acc.name}</p>
                                    <h2 className="text-3xl font-black tracking-tighter">
                                        <span className="text-zinc-500 text-xl font-medium mr-1.5">$</span>
                                        {acc.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </h2>
                                </div>
                            </button>
                        ))}
                        
                        {/* Botón rápido para añadir */}
                        <Link to="/new-account" className="min-w-25 h-44 rounded-4xl border-2 border-dashed border-zinc-800 flex items-center justify-center text-zinc-700 hover:text-zinc-500 hover:border-zinc-600 transition-all">
                            <Plus size={32} />
                        </Link>
                    </div>
                </section>

                {/* --- SECCIÓN DE MOVIMIENTOS DINÁMICA --- */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <h3 className="text-lg font-black tracking-tight uppercase italic">
                            Últimos Movimientos
                        </h3>
                        <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/5">
                            {['Todo', 'Ingresos', 'Gastos'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all
                                        ${activeFilter === f ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#121212] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                        {/* Evitamos el error .length con encadenamiento opcional */}
                        {displayMovements?.length > 0 ? (
                            <div className="divide-y divide-white/3">
                                {displayMovements.map((tx) => (
                                    <MovementItem 
                                        key={tx._id} 
                                        movement={tx} 
                                        onEdit={() => {}} 
                                        onDeleteClick={() => {}} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center flex flex-col items-center gap-3">
                                <div className="p-4 bg-zinc-900 rounded-full text-zinc-700">
                                    <ChevronRight size={32} className="rotate-90" />
                                </div>
                                <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest italic">
                                    Sin movimientos en {currentAccount?.name || 'esta cuenta'}
                                </p>
                            </div>
                        )}
                    </div>

                    <Link 
                        to="/history" 
                        className="mt-8 w-full py-5 bg-zinc-900 rounded-4xl border border-white/5 flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all group active:scale-[0.98]"
                    >
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors">
                            Ver todo el historial
                        </span>
                        <ChevronRight size={16} className="text-zinc-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Account;