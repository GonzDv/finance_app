//import { useContext } from 'react';
import SectionWrapper from "./SectionWrapper";
const SummaryCard = ({ accounts }) => {
	const totalBalance = accounts.reduce(
		(acc, account) => acc + account.balance,
		0
	);
	const month=new Date().toLocaleString('es-ES', { month: 'long'});
	return (
		<SectionWrapper className='flex flex-col items-center justify-center '>
			<div className='flex items-start w-full mb-4  '>
				<div>
					<p className='text-m font-medium'>
						Resumen de {month[0].toUpperCase() + month.slice(1)}
					</p>
				</div>
			</div>
				<div className='relative w-32 h-32 rounded-full border-4  items-center justify-center flex'>
					<p>aqui va chart</p>
				</div>

			{/* Detalles de Presupuesto (Estilo Notion) */}
			<div className='space-y-3 pt-4 border-t border-gray-800'>
				<div className='flex justify-between gap-4 text-sm'>
					<span className=''>
						Comida
					</span>
					<span className='font-semibold'>
						40%
					</span>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default SummaryCard;
