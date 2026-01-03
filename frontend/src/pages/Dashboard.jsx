import DashboardHeader from '@/components/DashboardHeader';
import AccountSection from '@/components/AccountSection';
import SummaryCard from '@/components/SummaryCard';
import BudgetList from '@/components/BudgetList';
import BottomNav from '@/components/BottomNav';
import CategoryList from '@/components/CategoryList';
import MovementsList from '@/components/MovementsList';
import FloatingActionButton from '@/components/FloatingActionBtn';
import { useState } from 'react';
const Dashboard = () => {
	const [accounts, setAccounts] = useState([]);
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
