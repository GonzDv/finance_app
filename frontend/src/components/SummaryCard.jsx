import { useContext } from 'react';
import SectionWrapper from "./SectionWrapper";
import useFinanceSummary from '@/hooks/useFinanceSummary';
const SummaryCard = ({ accounts }) => {
	const { totalSpent, budget, percentage, loading } = useFinanceSummary();
	const totalBalance = accounts.reduce(
		(acc, account) => acc + account.balance,
		0
	);
	const month = new Date().toLocaleString('es-ES', { month: 'long' });
	if (loading) return <div className="animate-pulse bg-gray-800 h-40 rounded-2xl"></div>;
	return (
		<SectionWrapper className='flex flex-col items-center justify-center '>
			<div className='flex items-start w-full mb-4  '>
				<div>
					<p className='text-m font-medium'>
						Resumen de {month[0].toUpperCase() + month.slice(1)}
					</p>
				</div>
			</div>
			<div className="w-full bg-[#1E1E1E] p-8 rounded-2xl border border-gray-800 shadow-xl ">
				<div className="flex justify-between items-start mb-4">
					<div>
						<p className="text-gray-400 text-m font-medium">Disponible Total:</p>
						<h2 className="text-3xl font-bold mt-1">
							${totalBalance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
						</h2>
					</div>
					<div className="relative w-16 h-16">
						<svg className="w-full h-full" viewBox="0 0 36 36">
							<path className="text-gray-800" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
							<path className="text-blue-500" strokeDasharray={`${percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
						</svg>
					</div>
				</div>

				<div className="space-y-3 pt-4 border-t border-gray-800">
					<div className="flex justify-between text-m">
						<span className="text-gray-500">Presupuesto mensual:</span>
						<span className="font-semibold text-gray-300">
							${budget.toLocaleString('es-MX')}
						</span>
					</div>
					<div className="w-full bg-gray-800 rounded-full h-1.5">
						<div
							className="bg-linear-to from-green-500 to-yellow-500 h-1.5 rounded-full transition-all duration-500"
							style={{ width: `${percentage}%` }}
						></div>
					</div>
					<p className="text-[12px] text-gray-500 text-right italic">
						Gastado este mes: ${totalSpent.toLocaleString('es-MX')}
					</p>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default SummaryCard;
