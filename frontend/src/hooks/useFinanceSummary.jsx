import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const useFinanceSummary = () => {
    const { user } = useContext(AuthContext);
    const [summary, setSummary] = useState({
        totalSpent: 0,
        budget: 12000, 
        percentage: 0,
        loading: true
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const { data } = await api.get('/transaction');
                const now = new Date();
                const currentMonthExpenses = data.filter(t => {
                    const tDate = new Date(t.date);
                    return (
                        t.type === 'expense' &&
                        tDate.getMonth() === now.getMonth() &&
                        tDate.getFullYear() === now.getFullYear()
                    );
                });

                const totalSpent = currentMonthExpenses.reduce((acc, t) => acc + t.amount, 0);
                const percentage = Math.min((totalSpent / summary.budget) * 100, 100);

                setSummary(prev => ({
                    ...prev,
                    totalSpent,
                    percentage,
                    loading: false
                }));
            } catch (error) {
                console.error("Error al calcular resumen:", error);
                setSummary(prev => ({ ...prev, loading: false }));
            }
        };

        if (user) fetchSummary();
    }, [user, summary.budget]);

    return summary;
};

export default useFinanceSummary;