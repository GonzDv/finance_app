import DashboardHeader from '@/components/DashboardHeader';
import AccountSection from '@/components/AccountSection';
import SummaryCard from '@/components/SummaryCard';
import BudgetList from '@/components/BudgetList';
import ButtomNav from '@/components/ButtomNav';
import CategoryList from '@/components/CategoryList';
import MovementsList from '@/components/MovementsList';
import FloatingActionButton from '@/components/FloatingActionBtn';
import api from '@/api/axios';
import { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
const Dashboard = () => {
	const { accounts, categories, transactions, loading } = useFinance();
	if (loading) return <p>Cargando datos...</p>;
	
	return (
		<div className='min-h-screen bg-[#121212] text-white pb-20'>
			<div className='p-6 space-y-6 max-w-2xl mx-auto'>
				<DashboardHeader />
				<AccountSection accounts={accounts}/>
				<SummaryCard accounts={accounts} />

				<CategoryList categories={categories} />
				<MovementsList transactions={transactions} />
				<BudgetList />
			</div>
			{/* <FloatingActionButton /> */}
			<ButtomNav />
		</div>
	);
};

export default Dashboard;
