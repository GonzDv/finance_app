import DashboardHeader from '@/components/DashboardHeader';
import AccountSection from '@/components/AccountSection';
import SummaryCard from '@/components/SummaryCard';
import BudgetList from '@/components/BudgetList';
import BottomNav from '@/components/BottomNav';
import CategoryList from '@/components/CategoryList';
import MovementsList from '@/components/MovementsList';
import FloatingActionButton from '@/components/FloatingActionBtn';
import api from '@/api/axios';
import { useState, useEffect } from 'react';
const Dashboard = () => {
	const [accounts, setAccounts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect( () => {
		const fetchAccounts = async () => {
			try {
				const { data } = await api.get('/accounts');
				setAccounts(data);
			} catch (error) {
				console.error('Error al obtener las cuentas:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchAccounts();
	}, []);
	if (loading) {
		return <div className='text-gray-500 text-sm p-6'>Cargando cuentas...</div>;
	}
	return (
		<div className='min-h-screen bg-[#121212] text-white pb-20'>
			<div className='p-6 space-y-6 max-w-md mx-auto'>
				<DashboardHeader />
				<AccountSection
					accounts={accounts}
					setAccounts={setAccounts}
				/>
				<SummaryCard accounts={accounts} />
				<CategoryList />
				<MovementsList />
				<BudgetList />
			</div>
			<FloatingActionButton />
			<BottomNav />
		</div>
	);
};

export default Dashboard;
