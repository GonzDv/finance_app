import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { CreditCard, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
const AccountSection = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const { data } = await api.get('/accounts');
                setAccounts(data);
            } catch (error) {
                console.error('Error al obtener las cuentas:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAccounts();
    }, [])

    if (loading) {
        return <div className='text-gray-500 text-sm'>Cargando cuentas...</div>;
    }
    return (
        <section>
            <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2 mi_password_seguro">
                {accounts.map((account) => (
                    <div
                        key={account._id}
                        className="min-w-40  bg-[#1E1E1E] p-2 rounded-xl border border-gray-800 flex flex-col justify-between scrollbar-hide"
                    >
                        <div>
                            <div className='flex items-center gap-2'>
                                <CreditCard color={account.color || '#3b82f6'} />
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider truncate">
                                    {account.name}
                                </p>
                            </div>
                            <div className='flex gap-2 items-end'>
                                <p className='text-sm'>Balance:</p>
                                <p className="text-md font-bold mt-1">
                                    ${account.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>

                    </div>
                ))}
                <Link 
                    to="/new-account"
                    className="min-w-35 border-2 border-dashed border-gray-800 rounded-xl p-2 flex items-center justify-center text-gray-600 hover:text-gray-400 hover:border-gray-600 transition-colors group">
                    <Plus size={20} strokeWidth={3} />
                </Link>
            </div>
        </section>
    )
}
export default AccountSection;