import api from '@/api/axios';

export const getDashboardData = async () => {
    const [acc, cat, mov] = await Promise.all([
        api.get('/accounts'),
        api.get('/categories'),
        api.get('/transaction')
    ]);
    return {
        accounts: acc.data,
        categories: cat.data,
        transactions: mov.data
    };
}