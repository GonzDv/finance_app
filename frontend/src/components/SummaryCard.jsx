//import { useContext } from 'react';

const SummaryCard = ({ accounts }) => {
	const totalBalance = accounts.reduce(
		(acc, account) => acc + account.balance,
		0
	);

	return (
		<div className='bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 shadow-xl'>
			<div className='flex justify-between items-start mb-4'>
				<div>
					<p className='text-gray-400 text-sm font-medium'>
						Disponible Total:
					</p>
					<h2 className='text-3xl font-bold mt-1'>
						$
						{totalBalance.toLocaleString('es-MX', {
							minimumFractionDigits: 2,
						})}
					</h2>
				</div>
				<div className='relative w-16 h-16'>
					<svg
						className='w-full h-full'
						viewBox='0 0 36 36'
					>
						<path
							className='text-gray-800'
							strokeDasharray='100, 100'
							d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
							fill='none'
							stroke='currentColor'
							strokeWidth='3'
						/>
						<path
							className='text-blue-500'
							strokeDasharray='75, 100'
							d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
							fill='none'
							stroke='currentColor'
							strokeWidth='3'
							strokeLinecap='round'
						/>
					</svg>
				</div>
			</div>

			{/* Detalles de Presupuesto (Estilo Notion) */}
			<div className='space-y-3 pt-4 border-t border-gray-800'>
				<div className='flex justify-between text-sm'>
					<span className='text-gray-500'>
						Presupuesto mensual:
					</span>
					<span className='font-semibold text-gray-300'>
						$12,000.00
					</span>
				</div>
				<div className='w-full bg-gray-800 rounded-full h-1.5'>
					<div
						className='bg-gradient-to-r from-green-500 to-yellow-500 h-1.5 rounded-full'
						style={{ width: '55%' }}
					></div>
				</div>
				<p className='text-[10px] text-gray-500 text-right italic'>
					Gastado: $6,621.44
				</p>
			</div>
		</div>
	);
};

export default SummaryCard;
