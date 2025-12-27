import DashboardHeader from '@/components/DashboardHeader';
import AccountSection from '@/components/AccountSection';
import SummaryCard from '@/components/SummaryCard';
import BudgetList from '@/components/BudgetList';
import BottomNav from '@/components/BottomNav';
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

				<BudgetList />
			</div>
			<BottomNav />
		</div>
	);
};

export default Dashboard;
