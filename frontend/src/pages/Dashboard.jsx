import DashboardHeader from '@/components/DashboardHeader';
import AccountSection from '@/components/AccountSection';
import SummaryCard from '@/components/SummaryCard';
import BudgetList from '@/components/BudgetList';
import BottomNav from '@/components/BottomNav';


const Dashboard = () => {

    return (
        <div className="min-h-screen bg-[#121212] text-white pb-20">
            <div className='p-6 space-y-6 max-w-md mx-auto'>
                <DashboardHeader />
                <AccountSection />
                <SummaryCard />
                <BudgetList />
            </div>
            <BottomNav />
        </div>
    );
};

export default Dashboard;