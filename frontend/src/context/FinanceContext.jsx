import { createContext, useState, useEffect, useContext } from 'react';
import api from '@/api/axios';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true);
        try {
            const [accRes, catRes, movRes] = await Promise.all([
                api.get('/accounts'),
                api.get('/categories'),
                api.get('/transaction')
                
            ]);
            setAccounts(accRes.data);
            setCategories(catRes.data);
            setTransactions(movRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos del dashboard:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])


    const deleteCategory = async (categoryId) => {
        try {
            await api.delete(`/categories/${categoryId}`);
            setCategories(prevCategories => prevCategories.filter(category => category._id !== categoryId));
            await fetchData();
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            alert('No se pudo eliminar la categoría. Por favor, inténtalo de nuevo.');
        }
    }
    const deleteTransaction = async (transactionId) => {
        try {
            await api.delete(`/transaction/${transactionId}`);
            setTransactions(prevTransactions => prevTransactions.filter(tx => tx.id !== transactionId));
            await fetchData();
        } catch (error) {
            console.error('Error al eliminar la transacción:', error);
            alert('No se pudo eliminar el movimiento. Por favor, inténtalo de nuevo.');
        }
    }
    return (
        <FinanceContext.Provider value={{
            accounts,
            categories,
            transactions,
            loading,
            deleteCategory,
            deleteTransaction,
            refreshData: fetchData
        }}>
            {children}
        </FinanceContext.Provider>
    )

};
export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
}

export default FinanceProvider;