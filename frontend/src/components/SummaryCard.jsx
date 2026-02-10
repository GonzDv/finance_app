import { useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import useFinanceSummary from '@/hooks/useFinanceSummary';
import { TrendingUp, Wallet, ArrowUpRight } from 'lucide-react';
import { motion, useSpring, useTransform } from "framer-motion";


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

const SummaryCard = ({ accounts }) => {
    const { totalSpent, budget, percentage, loading } = useFinanceSummary();
    const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
    const month = new Date().toLocaleString('es-ES', { month: 'long' });
    const capitalizedMonth = month[0].toUpperCase() + month.slice(1);

    if (loading) return (
        <div className="w-full max-w-4xl mx-auto h-64 bg-zinc-900/50 animate-pulse rounded-[2.5rem] border border-white/5" />
    );

    return (
        <SectionWrapper className='flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-6'>
            {/* Header de Sección Estilo Apple */}
            <div className='flex items-center justify-between w-full mb-6 px-4'>
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                    <p className='text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500'>
                        Resumen de {capitalizedMonth}
                    </p>
                </div>
                <button className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-1">
                    Detalles <ArrowUpRight size={12} />
                </button>
            </div>


            <div className="w-full bg-linear-to-br from-[#121212] to-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                

                <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-12 flex-col sm:flex-row gap-8">
                        {/* Balance Principal */}
                        <div className="text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                                    <Wallet size={14} className="text-emerald-500" />
                                </div>
                                <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.15em]">Total Disponible</p>
                            </div>

                            <h2 className="text-5xl font-black text-white tracking-tighter flex items-baseline justify-center sm:justify-start">
                                <span className="text-zinc-600 text-3xl font-medium mr-2">$</span>
                                <AnimatedNumber value={totalBalance} />
                            </h2>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase mt-2 tracking-widest">Peso Mexicano • MXN</p>
                        </div>

                        {/* Gráfico de Anillo Estilizado */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-zinc-800/40" strokeWidth="2" />
                                <motion.circle
                                    cx="18" cy="18" r="16" fill="none"
                                    className="stroke-emerald-500"
                                    strokeWidth="2.5"
                                    strokeDasharray={`${percentage}, 100`}
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: "0, 100" }}
                                    animate={{ strokeDasharray: `${percentage}, 100` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col bg-[#121212]/40 backdrop-blur-sm rounded-full m-2">
                                <span className="text-sm font-black text-white">
                                    <AnimatedNumber value={percentage} decimals={0} />%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Módulo de Presupuesto (Glass Pod) */}
                    <div className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-4xl border border-white/5 shadow-inner">
                        <div className="flex justify-between items-end mb-5">
                            <div className="space-y-1">
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Gastado este mes</p>
                                <p className="text-2xl font-black text-white tracking-tight">
                                    <span className="text-zinc-500 text-lg font-medium mr-1">$</span>
                                    <AnimatedNumber value={totalSpent} />
                                </p>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Presupuesto</p>
                                <p className="text-sm font-bold text-zinc-300">
                                    ${budget.toLocaleString('es-MX')}
                                </p>
                            </div>
                        </div>

                        {/* Barra de Progreso Minimalista */}
                        <div className="relative h-2.5 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                className="h-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                style={{ 
                                    background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #ef4444 100%)',
                                    width: `${Math.min(percentage, 100)}%` 
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(percentage, 100)}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>

                        {/* Status Footer */}
                        <div className="flex items-center gap-2 justify-center mt-5">
                            <div className={`p-1 rounded-full ${percentage > 90 ? "bg-red-500/10" : "bg-emerald-500/10"}`}>
                                <TrendingUp size={10} className={percentage > 90 ? "text-red-500" : "text-emerald-500"} />
                            </div>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                                {percentage > 100 ? "Límite excedido" : "Estado del presupuesto: Saludable"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default SummaryCard;