import { useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import useFinanceSummary from '@/hooks/useFinanceSummary';
import { TrendingUp, Wallet } from 'lucide-react';
import { motion, useSpring, useTransform } from "framer-motion";

const AnimatedNumber = ({ value, decimals = 2 }) => {
    let spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    
    let displayValue = useTransform(spring, (current) => 
        current.toLocaleString('es-MX', { 
            minimumFractionDigits: decimals, 
            maximumFractionDigits: decimals 
        })
    );

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return <motion.span>{displayValue}</motion.span>;
}
const SummaryCard = ({ accounts }) => {
	const { totalSpent, budget, percentage, loading } = useFinanceSummary();

	const totalBalance = accounts.reduce(
		(acc, account) => acc + account.balance,
		0
	);

	const month = new Date().toLocaleString('es-ES', { month: 'long' });
	const capitalizedMonth = month[0].toUpperCase() + month.slice(1);

	if (loading) return (
		<div className="w-full max-w-md mx-auto h-64 bg-zinc-900/50 animate-pulse rounded-[2.5rem] border border-white/5" />
	);

	return (
		<SectionWrapper className='flex flex-col items-center justify-center w-full max-w-md mx-auto'>
			<div className='flex items-center gap-2 w-full mb-4 px-2'>
				<div className="w-1 h-4 bg-emerald-500 rounded-full" />
				<p className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500'>
					Resumen de {capitalizedMonth}
				</p>
			</div>

			<div className="w-full bg-[#121212] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
				
				<div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full" />

				<div className="relative z-10">
					<div className="flex justify-between items-center mb-10">
						<div>
							<div className="flex items-center gap-2 mb-1">
								<Wallet size={12} className="text-emerald-500" />
								<p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Disponible Total</p>
							</div>

							<h2 className="text-4xl font-bold text-white tracking-tighter flex items-baseline">
								<span className="text-zinc-500 text-2xl font-medium mr-1">$</span>
								<AnimatedNumber value={totalBalance} />
							</h2>

						</div>

						<div className="relative w-20 h-20 flex items-center justify-center">
							<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
								<circle cx="18" cy="18" r="16" fill="none" className="stroke-zinc-800" strokeWidth="2.5" />
								<circle
									cx="18" cy="18" r="16" fill="none"
									className="stroke-emerald-500 transition-all duration-1000 ease-out"
									strokeWidth="2.5"
									strokeDasharray={`${percentage}, 100`}
									strokeLinecap="round"
								/>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center flex-col">
								<span className="text-[12px] font-bold text-white"><AnimatedNumber value={percentage} decimals={0} />%</span>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex justify-between items-end">
							<div className="space-y-1">
								<p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Gastado</p>
								<p className="text-lg font-bold text-white">${totalSpent.toLocaleString('es-MX')}</p>
							</div>
							<div className="text-right space-y-1">
								<p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Presupuesto</p>
								<p className="text-sm font-medium text-zinc-400">${budget.toLocaleString('es-MX')}</p>
							</div>
						</div>

						<div className="relative">
							<div className="w-full bg-zinc-800/50 rounded-full h-2 overflow-hidden border border-white/5">
								<div
									className="bg-linear-to-r from-emerald-500 via-yellow-500 to-red-500 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
									style={{ width: `${percentage}%` }}
								/>
							</div>
						</div>

						<div className="flex items-center gap-1.5 justify-center pt-2">
							<TrendingUp size={12} className={percentage > 90 ? "text-red-500" : "text-emerald-500"} />
							<p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
								{percentage > 100 ? "Has superado tu presupuesto" : "Vas por buen camino este mes"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default SummaryCard;