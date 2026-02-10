const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const Category = require('../models/Category');

exports.createTransaction = async (req, res) => {
    try {
        const { name, amount, type, accountId, categoryId, description } = req.body;

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

        res.status(201).json({ message: 'Transacción creada con éxito', transaction: transaction });

    } catch (error) {
        res.status(400).json({ message: 'Error al crear la transacción holaq', error });
    }
};

exports.createTransfer = async (req, res) => {
    try {
        const { amount, fromAccountId, toAccountId, description } = req.body;

        const fromAccount = await Account.findOne({ _id: fromAccountId, user: req.user._id });
        const toAccount = await Account.findOne({ _id: toAccountId, user: req.user._id });
        console.log(fromAccount, toAccount);
        if (!fromAccount || !toAccount) {
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

exports.deleteTransaction = async (req, res) => {
    try {
        const tx = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
        if (!tx) return res.status(404).json({ message: 'Transacción no encontrada' });

        if (tx.type === 'transfer') {
            const fromAcc = await Account.findById(tx.account);
            const toAcc = await Account.findById(tx.destinationAccount);
            
            if (fromAcc) fromAcc.balance += tx.amount;
            if (toAcc) toAcc.balance -= tx.amount;
            
            if (fromAcc) await fromAcc.save();
            if (toAcc) await toAcc.save();
        } else {
            const account = await Account.findById(tx.account);
            if (account) {
                if (tx.type === 'income') account.balance -= tx.amount;
                if (tx.type === 'expense') account.balance += tx.amount;
                await account.save();
            }

            if (tx.category && tx.type === 'expense') {
                const category = await Category.findById(tx.category);
                if (category) {
                    category.spent -= tx.amount;
                    await category.save();
                }
            }
        }

        await tx.deleteOne(); 

        res.status(200).json({ message: 'Transacción eliminada y saldos actualizados' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const oldTx = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
        if (!oldTx) return res.status(404).json({ message: 'No encontrada' });

        if (oldTx.type === 'transfer') {
            const fromAcc = await Account.findById(oldTx.account);
            const toAcc = await Account.findById(oldTx.destinationAccount);
            if (fromAcc) fromAcc.balance += oldTx.amount;
            if (toAcc) toAcc.balance -= oldTx.amount;
            if (fromAcc) await fromAcc.save();
            if (toAcc) await toAcc.save();
        } else {
            const acc = await Account.findById(oldTx.account);
            if (acc) {
                if (oldTx.type === 'income') acc.balance -= oldTx.amount;
                if (oldTx.type === 'expense') acc.balance += oldTx.amount;
                await acc.save();
            }
            if (oldTx.category && oldTx.type === 'expense') {
                const cat = await Category.findById(oldTx.category);
                if (cat) { cat.spent -= oldTx.amount; await cat.save(); }
            }
        }
        const { amount, description, accountId, categoryId, type, destinationAccountId } = req.body;
        
        oldTx.amount = amount !== undefined ? amount : oldTx.amount;
        oldTx.description = description || oldTx.description;
        oldTx.account = accountId || oldTx.account;
        oldTx.destinationAccount = destinationAccountId || oldTx.destinationAccount;
        oldTx.category = categoryId || oldTx.category;
        oldTx.type = type || oldTx.type;

        if (oldTx.type === 'transfer') {
            const fromAcc = await Account.findById(oldTx.account);
            const toAcc = await Account.findById(oldTx.destinationAccount);
            fromAcc.balance -= oldTx.amount;
            toAcc.balance += oldTx.amount;
            await fromAcc.save();
            await toAcc.save();
        } else {
            const acc = await Account.findById(oldTx.account);
            if (oldTx.type === 'income') acc.balance += oldTx.amount;
            if (oldTx.type === 'expense') acc.balance -= oldTx.amount;
            await acc.save();

            if (oldTx.category && oldTx.type === 'expense') {
                const cat = await Category.findById(oldTx.category);
                if (cat) { cat.spent += oldTx.amount; await cat.save(); }
            }
        }
        await oldTx.save();
        res.status(200).json({ message: 'Actualizada con éxito', transaction: oldTx });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};