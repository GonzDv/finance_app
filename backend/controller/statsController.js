const Transaction = require('../models/Transaction');
const Category = require('../models/Category');

exports.getDashboardStats = async (req, res) => {
    try {
        const transaction = await Transaction.find({type: 'expense'});
        const totalSpend = transaction.reduce((acc, curr) => acc + (curr.amount || 0), 0);

        const categories = await Category.find();
        const breakdown = categories.map(cat => ({
            name: cat.name,
            spent: cat.spent,
            budget: cat.budget,
            porcetage: cat.budget > 0 ? +((cat.spent / cat.budget) * 100).toFixed(2) : 0,
            color: cat.icon || '#333'
        }));

        res.json({
            totalSpend,
            breakdown
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las estadísticas', error
        })
    }
};