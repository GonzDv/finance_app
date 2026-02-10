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
	
	const { accounts, categories, transactions, loading, deleteTransaction, deleteCategory } = useFinance();
	if (loading) return <p>Cargando datos...</p>;
	
	return (
		<div className=''>
			<div className='p-6 space-y-6 max-w-2xl mx-auto'>
				<DashboardHeader />
				<AccountSection accounts={accounts}/>
				<SummaryCard accounts={accounts} />

				<CategoryList categories={categories} deleteCategory={deleteCategory} />
				<MovementsList transactions={transactions} deleteTransaction={deleteTransaction} />
				<BudgetList />
			</div>
			
			<ButtomNav />
		</div>
	);
};

export default Dashboard;
