const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const Category = require('../models/Category');

exports.createTransaction = async (req, res) => {
    try {
        const {name, amount, type, accountId, categoryId, description} = req.body;

        const transaction = new Transaction({
            name,
            amount,
            type,
            account: accountId,
            category: categoryId,
            user: req.user._id,
            description
        })
        await transaction.save();

        const account = await Account.findById(accountId);
        if (type === 'income') {
            account.balance += amount;
        } else if (type === 'expense') {
            account.balance -= amount;
        }
        await account.save();

        if (categoryId && type === 'expense') {
            const category = await Category.findById(categoryId);
            category.spent += amount;
            await category.save();
        }

        res.status(201).json({ message: 'Transacción creada con éxito', transaction: transaction  });

    } catch (error) {
        res.status(400).json({ message: 'Error al crear la transacción holaq', error });
    }
};

exports.createTransfer = async (req, res) => {
    try {
        const {amount, fromAccountId, toAccountId, description} = req.body;
        
        const fromAccount = await Account.findOne({ _id: fromAccountId, user: req.user._id });
        const toAccount = await Account.findOne({ _id: toAccountId, user: req.user._id });
        console.log(fromAccount, toAccount);
        if(!fromAccount || !toAccount) {
            return res.status(404).json({ message: 'Una o ambas cuentas no existen' });
        }
        fromAccount.balance -= amount;
        toAccount.balance += amount;

        await fromAccount.save();
        await toAccount.save();

        const transfer = await Transaction.create({
            description: description || "Transferencia entre cuentas",
            amount,
            type: 'transfer',
            account: fromAccountId,
            destinationAccount: toAccountId,
            user: req.user._id
        })
        res.status(201).json({ message: 'Transferencia realizada con éxito', transfer });
    } catch (error) {
        res.status(400).json({ message: 'Error al realizar la transferencia', error });
    }  
    };

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id })
            .populate('account')
            .populate('category')
            .populate('destinationAccount');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las transacciones', error });
    }
};